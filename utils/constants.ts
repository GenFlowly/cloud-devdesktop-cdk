// Constants.ts
export const AWS_DEFAULT_REGION = 'us-east-1';
export const EC2_DEPLOYMENT_INSTANCE = 'DevDesktopStack';
export const ASK_GPT_VPC = 'AskGPTVPC'

export const UBUNTU_64_X86_AMI = 'ami-007855ac798b5175e'
// Verify AMI with this - aws ec2 describe-images --image-ids ami-xxxxxxxxxxxxxxxxx --query 'Images[*].Architecture'
export const FREE_TIER = 't2.micro'
export const EC2_DEPLOYMENT_INSTANCE_EIP = 'DeploymentEIP';