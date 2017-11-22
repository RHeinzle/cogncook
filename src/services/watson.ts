import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';

@Injectable()
export class WatsonService {

    private static readonly host: string = 'https://gateway-a.watsonplatform.net/visual-recognition/api'
    private static readonly key: string = 'e45c7957f9c679f72b5ef00972c7c4bbdfd78e92';
    private static readonly version: string = '2016-05-20'

    constructor(private transfer: FileTransfer) {
    }

    classify(imageURI): Promise<any> {
      const endpoint = '/v3/classify';
      const classifierId = 'food';

      let params = new URLSearchParams();
      params.set('api_key', WatsonService.key);
      params.set('version', WatsonService.version);
      params.set('classifier_ids', classifierId);

      let url = WatsonService.host + endpoint + "?" + params.toString();

      const fileTransfer: FileTransferObject = this.transfer.create();
      const options: FileUploadOptions = {
         fileKey: 'images_file',
         headers: {'Accept-Language': 'en'}
      }
      return fileTransfer.upload(encodeURI(imageURI), url, options).then(
         data => {
           console.log(data.response);
           let result = JSON.parse(data.response);
           let classes = this.filterClasses(result.images[0].classifiers[0]);

           if (classes.length == 0) {
             throw new Error("Image couldn't be recognized");
           }
           return classes;
         },
         err => {
           console.error(err)
         }
       );
    }

    private filterClasses(classifier) {
      const minScore = 0.5;
      return classifier.classes.filter(function(classe) {
        return (classe.score > minScore && classe.class !== 'non-food');
      });

    }

}
