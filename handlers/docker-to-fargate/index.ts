import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";
import * as pulumi from "@pulumi/pulumi";
import { join } from "path";
import { exportEnv } from "../../utils";

export function deployDockerToFargate() {
    const cluster = new aws.ecs.Cluster("cluster", {});

    const lb = new awsx.lb.ApplicationLoadBalancer("lb", {
        defaultTargetGroup: {
            port: 3000, // Port exposed in the Dockerfile
        }
    });

    const repository = new awsx.ecr.Repository("repository", {});

    const image = new awsx.ecr.Image("image", {
        repositoryUrl: repository.url,
        path: join(__dirname, "/../app"),
    });

    const service = new awsx.ecs.FargateService("service", {
        cluster: cluster.arn,
        assignPublicIp: true,
        taskDefinitionArgs: {
            container: {
                image: image.imageUri,
                cpu: 128,
                memory: 50,
                essential: true,
                portMappings: [{
                    targetGroup: lb.defaultTargetGroup,
                }],
                environment: exportEnv(join(__dirname, "/../app/.env.prod"))
            },
        },
        desiredCount: 2
    });

    const loadBalancerUrl = pulumi.interpolate`http://${lb.loadBalancer.dnsName}`;

    return { loadBalancerUrl };
}