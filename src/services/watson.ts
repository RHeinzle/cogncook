import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Helper } from './helper';

@Injectable()
export class WatsonService {

    private static readonly host: string = 'https://gateway-a.watsonplatform.net/visual-recognition/api'
    private static readonly key: string = 'e45c7957f9c679f72b5ef00972c7c4bbdfd78e92';
    private static readonly version: string = '2016-05-20'

    constructor(private transfer: FileTransfer,
                private helper: Helper) {
    }

    classify(imageURI): Promise<Array<any>> {
      const endpoint = '/v3/classify';
      const classifierIds = ['default', 'food'];
      const threshold = '0.5';

      let params = new URLSearchParams();
      params.set('api_key', WatsonService.key);
      params.set('version', WatsonService.version);
      params.set('classifier_ids', this.helper.join(classifierIds));
      params.set('threshold', threshold); // minimum score a class must have

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
           let classes = this.filterClasses(result.images[0].classifiers);
           if (!Array.isArray(classes) || classes.length == 0) {
             throw new Error("Image couldn't be recognized");
           }
           return classes;
         },
         err => {
           console.error(err.message)
         }
       );
    }

    private filterClasses(classifiers): Array<any> {
      const filterUnwantedClassesFood = ['accessory fruit', 'alcoholic beverage', 'beverage', 'condiment', 'dairy product', 'delicacy', 'food seasoning', 'non-food', 'pet food', 'snack food', 'spread', 'sweet'];
      const filterTypeHierarchyDefault = ['animal', 'food', 'fruit', 'fungus', 'nature', 'plant'];
      let classes: Array<any> = new Array();

      classifiers.forEach(classifier => {
        switch (classifier.classifier_id) {
          case 'food': {
            Array.prototype.push.apply(classes,
              classifier.classes.filter(classe => {
                return !filterUnwantedClassesFood.some(function (element) {
                    return classe.class == element;
                });
              })
            );
            break;
          }
          case 'default': {
            Array.prototype.push.apply(classes,
              classifier.classes.filter(classe => {
                return filterTypeHierarchyDefault.some(function (element) {
                    if (classe.type_hierarchy != null){
                      return classe.type_hierarchy.startsWith('/' + element);
                    }
                });
              })
            );
            break;
          }
        }
      });

      classes.sort(function(a,b){return b.score - a.score});
      classes = classes.filter((obj, pos, arr) => {
        return arr.map(mapObj => mapObj.class).indexOf(obj.class) === pos;
    });
      return classes;
    }

}
