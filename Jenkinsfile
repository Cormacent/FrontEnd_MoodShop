def dockerhub = "zakimaulana/frontendmoodshop"
def image_name = "${dockerhub}:${BRANCH_NAME}"
def builder

pipeline {
    agent any 

    stages {
        stage('Install Dependencies') { 
            steps {
                nodejs('yarn14') {
                    sh 'yarn install'
                    sh 'yarn build'
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
                    checkout scm
                    docker.withRegistry('https://registry.hub.docker.com', 'docker-creds-zaki') {
                        builder.push()
                    }
                }
            }
        }
        stage("remove unused docker image"){
            steps{
                script {
                    sh 'docker rmi zakimaulana/frontendmoodshop:master'
                    sh 'docker rmi registry.hub.docker.com/zakimaulana/frontendmoodshop:master'
                }
            }
        }
        stage("Deploy to deployment server"){
            steps{
                script {
                    sshPublisher(
                        publishers: [
                            sshPublisherDesc(
                                configName: 'moodshopdev',
                                verbose: true,
                                transfers: [
                                    sshTransfer(
                                        sourceFiles: "docker-compose.yml",
                                        execCommand: "cd /home/zaki/app;\
                                                    docker-compose up -d;",
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
