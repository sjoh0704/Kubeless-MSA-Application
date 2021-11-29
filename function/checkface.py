from keras.models import load_model
from PIL import Image, ImageOps
import numpy as np
import urllib.request
# import urllib.parse
from io import BytesIO
import requests, json

def handler(event, context):
    print("event occurs")
    # event = {}
    # event["data"] = b'13b47b485af57ad03657288f86db0d62cc0a21bf51849e1b77779925e7fc2eae https://hanbucket-test.s3.ap-northeast-2.amazonaws.com/1619598179113_0.jpg'    
    try:
        print("data:", event["data"])
        userId, url = event["data"].decode().split()
        # url = "https://hanbucket-test.s3.ap-northeast-2.amazonaws.com/img.png"
        print("URL:", url)
        req = urllib.request.Request(url, headers = {"User-Agent" : "Mozilla/5.0"})
        print(1)
        res = urllib.request.urlopen(req).read()
        print(2)
        image = Image.open(BytesIO(res)).convert('RGB')

        # keras
        print(3)
        if userId[0] == '0':
            model = load_model('/kubeless/model/male/keras_model.h5')
            # model = load_model('./model/male/keras_model.h5')
            print('male')
        else:
            model = load_model('/kubeless/model/female/keras_model.h5')
            # model = load_model('./model/female/keras_model.h5')
            print('female')

        print(4)
        data = np.ndarray(shape=(1, 224, 224, 3), dtype=np.float32)
        print(5)
        size = (224, 224)
        print(6)
        image = ImageOps.fit(image, size, Image.ANTIALIAS)
        print(7)
        image_array = np.asarray(image)
        print(8)
        normalized_image_array = (image_array.astype(np.float32) / 127.0) - 1
        print(9)
        print(data)
        data[0] = normalized_image_array
        print(10)
        prediction = model.predict(data)
        
        #result
        print("고양이:", float(prediction[0][0]))
        print("강아지:", float(prediction[0][1]))
        print("공룡:", float(prediction[0][2]))
        print("곰:", float(prediction[0][3]))
        print("여우:", float(prediction[0][4]))
        print("토끼:", float(prediction[0][5]))
        data = {
            'userId': userId,
            'cat': float(prediction[0][0]),
            'dog': float(prediction[0][1]),
            'dino': float(prediction[0][2]),
            'bear': float(prediction[0][3]),
            'fox': float(prediction[0][4]),
            'rabbit': float(prediction[0][5])
        }
        print(data)
        headers = {'Content-Type': 'application/json; charset=utf-8'}
        # res = requests.post("http://localhost:8080/api/v1/info", data=json.dumps(data), headers=headers)
        res = requests.post("http://backend-service.default.svc:8080/api/v1/info", data=json.dumps(data), headers=headers)
        print(res.text)
        return 'ok'
        
    except Exception as e:
        print(e)
        return 'fail'



   
# handler(1, 1)
