def dockerhub = "zakimaulana/frontendmoodshop"
def image_name = "${dockerhub}:${BRANCH_NAME}"
def builder

pipeline {
    agent any 

    parameters {
        string(name: 'DOCKERHUB', defaultValue: 'halohalo', description: 'testteest')
        booleanParam(name: 'RUNTEST', defaultValue: 'true', description: 'testteest')
        choice(name: 'DEPLOY', choices: ['yes','no'], description: 'testteest')
    }

    stages {
        stage('Install Dependencies') { 
            steps {
                nodejs('node14') {
                     sh 'yarn install'
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
            steps{
                script {
                    sshPublisher(
                        publishers: [
                            sshPublisherDesc(
                                configName: 'developer',
                                verbose: false,
                                transfers: [
                                    sshTransfer(
                                        execCommand: "docker pull ${image_name};",
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
