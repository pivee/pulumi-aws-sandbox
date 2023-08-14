import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";
import * as pulumi from "@pulumi/pulumi";
import { join } from "path";
import { exportEnv } from "../../utils";
import { existsSync } from "fs";

export const dockerApps = {
    javascript: "js",
    typescript: "ts",
    nextjs: "next"
} as const;

type DockerApp = (typeof dockerApps)[keyof typeof dockerApps]

export function deployDockerToFargate(app: DockerApp) {
    const cluster = new aws.ecs.Cluster("cluster", {});

    const lb = new awsx.lb.ApplicationLoadBalancer("lb", {
        defaultTargetGroup: {
            port: 3000, // Port exposed in the Dockerfile
        }
    });

    const repository = new awsx.ecr.Repository("repository", {
        forceDelete: true
    });

    const ecrUrl = repository.url;

    const image = new awsx.ecr.Image("image", {
        repositoryUrl: repository.url,
        path: join(__dirname, `/../../apps/${app}`),
    });

    const envFile = join(__dirname, `/../../apps/${app}/.env.prod`)
    let environment: { name: string, value: string }[] = [];
    
    try {
        if (existsSync(envFile)) environment = exportEnv(envFile)
    } catch (error) {
        console.warn(error);
    }

    const service = new awsx.ecs.FargateService("service", {
        cluster: cluster.arn,
        assignPublicIp: true,
        taskDefinitionArgs: {
            container: {
                image: image.imageUri,
                cpu: 1,
                memory: 512,
                essential: true,
                portMappings: [{
                    targetGroup: lb.defaultTargetGroup,
                }],
                environment: environment
            },
        },
        desiredCount: 2
    });

    const loadBalancerUrl = pulumi.interpolate`http://${lb.loadBalancer.dnsName}`;

    return { ecrUrl, loadBalancerUrl };
}