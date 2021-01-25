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
                            sh 'printf "VUE_APP_URL=http://35.174.207.150/api/\nVUE_APP_API=35.174.207.150/api/" > .env'
                            sh 'cat .env'
                            sh 'ls -la'
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
                            sh 'printf "VUE_APP_URL=http://34.228.145.89/api/\nVUE_APP_API=34.228.145.89/api/" > .env'
                            sh 'ls -lah'
                        }
                    }
                }
            }
        }
        stage('build docker image') { 
             steps {
                 script {
                     builder = docker.build(image_name, "--no-cache .")
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
    }
}
