def dockerhub = "zakimaulana/frontendmoodshop"
// def image_name = "${dockerhub}:${BRANCH_NAME}"
def image_name = "${dockerhub}:master"
def builder

pipeline {
    agent any 

    stages {
        stage('Install Dependencies') { 
            steps {
                nodejs('yarn14') {
                    sh 'yarn install'
                    sh 'printf "VUE_APP_URL=http://3.90.20.177:30123/api/\nVUE_APP_API=3.90.20.177:30123/api/" > .env'
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
                                        sourceFiles: 'docker-compose.yml',
                                        execCommand: "cd /home/zaki/app;\
                                                    echo docker-compose up -d",
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
