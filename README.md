# Kubeless 기반 인공지능 동물상 테스트 MSA Application

<br/>

## 개요

인공지능 동물상 테스트 애플리케이션을 MSA로 개발합니다.
K8S의 serverless 오픈소스인 Kubeless를 이용하여 동물상 모델 판정 서비스를 함수형 서비스로 구현하였습니다. 사진 업로드시 해당 요청이 메시지 큐를 통해 전달되어 동물상 모델 판정 함수를 실행시킵니다. 실행 결과는 프론트를 통해 리턴됩니다.

<br/>

## 개요도

![image](https://user-images.githubusercontent.com/66519046/144041217-981762bc-be0e-4ca7-9d3b-6c70abbeedcd.png)

<br/>

## 주요 기술

-   Message Queue
-   Function as a service
-   Container Orchestration
-   [App of Apps Pattern](https://github.com/sjoh0704/Sseung-Helm-Chart/tree/master/App "go to sjoh0704's helm chart!")
-   동물상 테스트 AI(Teachable machine + [image crawling](https://github.com/sjoh0704/Image-Crawling "image crawling"))

<br/>

## 적용 기술

### 1. Infrastructure Techs

-   Kubernetes
-   Kubeless
-   Kafka

<br/>

### 2. Application Techs

-   Nodejs
-   React
-   Keras
-   Python

<br/>

### 3. CI/CD Techs

<!-- - [Helm](https://github.com/sjoh0704/Sseung-Helm-Chart/tree/master/MSA-Shop "go to sjoh0704's helm chart!") -->
<!-- - Jenkins -->

-   git
-   Helm
-   ArgoCD

<br/>
<!-- 
## Manifest
- [go to Helm chart](https://github.com/sjoh0704/Sseung-Helm-Chart/tree/master/MSA-Shop "go to sjoh0704's helm chart!") -->

<br/>

## Software Architecture

![image](https://user-images.githubusercontent.com/66519046/141689717-f0f58ac2-b03a-4b46-9519-4fddd07edfac.png)

<!-- ### 1. Infrastructure Diagram
![image](https://user-images.githubusercontent.com/66519046/133252790-b19b0e60-5452-40b9-a0a1-7a1fed6ab104.png)

<br/>

### 2. Service Diagram
![image](https://user-images.githubusercontent.com/66519046/133252317-20e43bf0-1ee7-4c13-86a2-dcdd5c7400ec.png)

<br/>

### 3. S/W Diagram
![image](https://user-images.githubusercontent.com/66519046/133252515-1cf9e35a-e2ea-419b-8c93-4ffdbc4e2a3e.png)

<br/>

### 4. CI/CD Diagram
![image](https://user-images.githubusercontent.com/66519046/133252709-4c2519e5-7b08-4140-8824-47816504dd5a.png) -->

<br/>

## Result

![Screenshot from 2021-11-30 21-10-30](https://user-images.githubusercontent.com/66519046/144045687-dfc0c4c4-8fee-4f25-86c8-5ea980c1e0b8.png)
