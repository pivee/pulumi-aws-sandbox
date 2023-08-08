import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";

export function deployDockerToFargate() {
    const cluster = new aws.ecs.Cluster("cluster", {});
    
    const lb = new awsx.lb.ApplicationLoadBalancer("lb", {});

    const repository = new awsx.ecr.Repository("repository", {});
    
    const image = new awsx.ecr.Image("image", {
        repositoryUrl: repository.url,
        path: "./src",
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
            },
        },
        desiredCount: 2
    });

    const loadBalancerUrl = lb.loadBalancer.dnsName;

    return { loadBalancerUrl };
}