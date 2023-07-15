import { aws_ec2 as ec2 } from 'aws-cdk-lib';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as fs from "fs";
import { AskGPTSecurityGroup } from './security-group';

export interface EC2StackProps extends cdk.StackProps {
    readonly instanceType: string;
    readonly amiId: string;
    readonly instance: string;
    readonly vpc: string;
    readonly region: string;
    readonly userDataScript: string;
    readonly eip: string;
    readonly keyName: string;
}

export class EC2Stack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: EC2StackProps) {
        super(scope, id, props);

        const ec2Vpc = new ec2.Vpc(this, props.vpc, {
            vpcName: props.vpc,
            cidr: '10.0.0.0/16',
            natGateways: 0,
            subnetConfiguration: [
                {name: 'public', cidrMask: 24, subnetType: ec2.SubnetType.PUBLIC},
            ],
        });

        const eipAssociationId = 'EIP'+id;
        const ec2SecurityGroupId = 'EC2SecurityGroup'+id;

        const machineImage = new ec2.GenericLinuxImage({
            [props.region]: props.amiId,
        });

        const securityGroup = new AskGPTSecurityGroup(this, ec2SecurityGroupId, {
            vpc: ec2Vpc,
        });


        const instance = new ec2.Instance(this, props.instance, {
            instanceName: props.instance,
            vpc: ec2Vpc,
            vpcSubnets: {
                subnetType: ec2.SubnetType.PUBLIC,
            },
            instanceType: new ec2.InstanceType(props.instanceType),
            machineImage: machineImage,
            keyName: props.keyName,
            securityGroup: securityGroup
        });

        instance.addUserData(fs.readFileSync(props.userDataScript, 'utf8'));

        // Associate Elastic IP with the instance
        new ec2.CfnEIPAssociation(this, eipAssociationId, {
            eip: new ec2.CfnEIP(this, props.eip).ref,
            instanceId: instance.instanceId,
        });
    }
}
