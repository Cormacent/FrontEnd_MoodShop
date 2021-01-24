def dockerhub = "zakimaulana/frontendmoodshop"
def image_name = "${dockerhub}:${BRANCH_NAME}"
def builder

pipeline {
    agent any 

    parameters {
        choice(name: 'DEPLOY', choices: ['DEV','PROD'])
    }

    stages {
        stage('Install Dependencies') { 
            parallel {
                stage("DEV"){
                    when {
                        expression {
                            params.DEPLOY == "DEV"
                        }
                    }
                    steps {
                        nodejs('node14yarn') {
                            sh 'yarn install'
                            sh '''
                                cat << EOF > file1.txt
                                VUE_APP_URL=http://35.174.207.150/api/
                                VUE_APP_API=35.174.207.150/api/ 
                                EOF
                            '''
                            sh 'ls -lah'
                            sh 'docker ps'
                            sh 'docker ps -a'
                        }
                    }
                }
                stage("PROD"){
                    when {
                        expression {
                            params.DEPLOY == "PROD"
                        }
                    }
                    steps {
                        nodejs('node14yarn') {
                            sh 'yarn install'
                            sh 'ls -lah'
                            sh '''
                                cat << EOF > file1.txt
                                VUE_APP_URL=http://34.228.145.89/api/
                                VUE_APP_API=34.228.145.89/api/ 
                                EOF
                            '''
                        }
                    }
                }
            }
        }
        stage('build docker image') { 
             steps {
                 script {
                     builder = docker.build(image_name)
                 }
            }
        }
        stage('test docker image') { 
             steps {
                 script {
                     builder.inside {
                         sh 'echo passed'
                     }
                 }
            }
        }
        stage('Push Image to Registries') { 
            steps {
                script {
                    builder.push()
                }
            }
        }
        stage("Deploy to other server"){
            parallel {
                stage("DEV"){
                    when {
                        expression {
                            params.DEPLOY == "DEV"
                        }
                    }
                    steps{
                        script {
                            sshPublisher(
                                publishers: [
                                    sshPublisherDesc(
                                        configName: 'development',
                                        verbose: false,
                                        transfers: [
                                            sshTransfer(
                                                sourceFiles: 'docker-compose.yml',
                                                execCommand: "docker pull ${image_name}; cd /home/production/app; docker-compose down; docker-compose up -d",
                                                execTimeout: 1200000
                                            )
                                        ]
                                    )
                                ]
                            )
                        }
                    }
                }
                stage("PROD"){
                    when {
                        expression {
                            params.DEPLOY == "PROD"
                        }
                    }
                    steps{
                        script {
                            sshPublisher(
                                publishers: [
                                    sshPublisherDesc(
                                        configName: 'production',
                                        verbose: false,
                                        transfers: [
                                            sshTransfer(
                                                sourceFiles: 'docker-compose.yml',
                                                execCommand: "docker pull ${image_name}; cd /home/production/app; docker-compose down; docker-compose up -d",
                                                execTimeout: 1200000
                                            )
                                        ]
                                    )
                                ]
                            )
                        }
                    }
                }
            }
        }
    }
}
