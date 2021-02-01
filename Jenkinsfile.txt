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
                            sh 'printf "VUE_APP_URL=http://3.90.20.177:30123/api/\nVUE_APP_API=3.90.20.177:30123/api/" > .env'
                            sh 'yarn build'
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
        stage("remove unused docker image"){
            steps{
                script {
                    sh 'docker rmi \$(docker images -f "dangling=true" -q)'
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
                                        verbose: true,
                                        transfers: [
                                            sshTransfer(
                                                sourceFiles: 'docker-compose.yml',
                                                execCommand: "docker pull ${image_name};\
                                                            cd /home/developer/app; docker-compose down;\
                                                            docker rmi -f \$(docker images -f 'dangling=true' -q);\
                                                            docker-compose up -d",
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
                                        verbose: true,
                                        transfers: [
                                            sshTransfer(
                                                sourceFiles: 'docker-compose.yml',
                                                execCommand: "docker pull ${image_name};\
                                                            cd /home/production/app;\
                                                            docker-compose down;\
                                                            docker rmi -f \$(docker images -f 'dangling=true' -q);\
                                                            docker-compose up -d",
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
