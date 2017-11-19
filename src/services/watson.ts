import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
// import { File } from '@ionic-native/file';
import { Helper } from './helper';
import 'rxjs/Rx';

@Injectable()
export class WatsonService {

    private static readonly host: string = 'https://gateway-a.watsonplatform.net/visual-recognition/api'
    private static readonly key: string = 'e45c7957f9c679f72b5ef00972c7c4bbdfd78e92';
    private static readonly version: string = '2016-05-20'

    constructor(private http: Http,
                private transfer: FileTransfer,
                // private file: File
                private helper: Helper,
              ) {

          // const fileTransfer: FileTransferObject = this.transfer.create();

    }

    // TODO melhorar regras de classificadores
    // classify(pictures) {
    //     const endpoint = '/v3/classify';
    //     const classifierIds = ['food','default'];
    //
    //     let params = `?api_key=${WatsonService.key}&version=${WatsonService.version}&classifier_ids=${this.helper.join(classifierIds)}`;
    //
    //     var fileName = pictures[0].substring(pictures[0].lastIndexOf('/')+1);
    //           var json=  {
    //             "id":123,
    //             "name" :fileName
    //           }
    //         var fileUploadOptions = new FileUploadOptions();
    //          fileUploadOptions.fileKey="file";
    //          fileUploadOptions.fileName = fileName;
    //          fileUploadOptions.params = {
    //            json : json
    //          };
    //          fileUploadOptions.mimeType="image/jpeg";
    //          var URL = WatsonService.host + endpoint + params;
    //          var encodedURI = encodeURI(URL);
    //          console.log('fileUploadOptions : ',fileUploadOptions);
    //          var ft = new FileTransfer();
    //          ft.upload(imageUrl, encodedURI, onSuccess, onError, fileUploadOptions, false);
    //
    //          function onSuccess(response){
    //           console.log('file uploaded: ',response);
    //          }
    //          function onError(error){
    //            console.log('upload failed',error);
    //          }
    // }

    upload(imageData): Promise<string> {
      const endpoint = '/v3/classify';
      const classifierIds = ['food','default'];
      let params = `?api_key=${WatsonService.key}&version=${WatsonService.version}&classifier_ids=${this.helper.join(classifierIds)}`;
      let url = WatsonService.host + endpoint + params;

      console.log("Image:" + encodeURI(imageData));
      console.log("URL: " + url);

      const fileTransfer: FileTransferObject = this.transfer.create();

      const options: FileUploadOptions = {
         fileKey: 'images_file',
         headers: {'Accept-Language': 'en'}
      }

      return fileTransfer.upload(encodeURI(imageData), url, options)
       .then(
         data => {
           console.log(data.response);
           return data.response;
         },
         err => {
           console.log(err.body);
         }
       );
    }

    classifyMock(imageData) {
        /*TESTE*/
        return this.http.get('assets/mock/classify.json').map(data => {
            let imageData = data.json().images[0];
            let classifier = imageData.classifiers.filter(function(classifier) {
                return classifier.name == 'food';
            });
            let ingredient = classifier[0].classes[0].class;
            return ingredient;
        });
    }

}
