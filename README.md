## Configure AWS CLI first, DO NOT DEPLOY FROM LOCAL
* Use `aws configure`
* Create `User` in IAM, and get access key, secret key
* Install nvm - `curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash `
* Install node - `nvm install node`
* Install aws cdk - `npm install -g aws-cdk`
* Verify - `cdk --version`
* Clone dir locally - `git clone https://github.com/GenFlowly/cloud-devdesktop-cdk.git`
* Go to CDK dir and install dependencies - `cd cloud-devdesktop-cdk && npm i`

- To create a new EC2 Deployment instance, first create a key pair-
    * For Mac / Linux - `cd ~/.ssh`
    * `aws ec2 create-key-pair --region us-east-1 --key-name EC2DeploymentInstanceKeyPair --query 'KeyMaterial' --output text > EC2DeploymentInstanceKeyPair.pem`
    * Give 400 permission to keypair `chmod 400 ~/.ssh/EC2DeploymentInstanceKeyPair.pem`, **might not work for windows**
* ```cdk bootstrap aws://<your_dev_account>>/us-east-1``` # only once, don't run again
* `cdk deploy DevDesktopStack`
- To ssh the EC2 instance, use this template -
  - `ssh -i /path/to/keypair.pem ubuntu@<Public_IPv4_DNS>`
  - If on Mac / Linux (Assuming you have created keypair in `~/.ssh` with same name as mentioned above) -
      - Use your own IP address - `ssh -i "~/.ssh/EC2DeploymentInstanceKeyPair.pem" ubuntu@ec2-<external-ip-address>.compute-1.amazonaws.com`
