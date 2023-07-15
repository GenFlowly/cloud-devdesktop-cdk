import { aws_ec2 as ec2 } from 'aws-cdk-lib';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

export interface SecurityGroupProps extends cdk.StackProps {
    readonly vpc: ec2.Vpc;
}

export class AskGPTSecurityGroup extends ec2.SecurityGroup {
    constructor(scope: Construct, id: string, props: SecurityGroupProps) {
        super(scope, id, {
            securityGroupName: id,
            vpc: props.vpc,
            description: 'Allow ssh access to ec2 instances',
            allowAllOutbound: true   // Can be set to false if you don't want instances to connect to the internet
        });

        this.addIngressRule(
            ec2.Peer.anyIpv4(),
            ec2.Port.tcp(22),
            'allow ssh access from the world');
    }
}
