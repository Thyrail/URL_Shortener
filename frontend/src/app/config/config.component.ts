import { Component } from '@angular/core';
import { Config, ConfigService } from './config.service';

@Component({
    selector: 'app-config',
    templateUrl: './config.component.html',
    providers: [ ConfigService ],
    styles: ['.error {color: red;}']
  })
  
  export class ConfigComponent {
    error: any;
    headers: string[];
    config: Config;
  
    constructor(private configService: ConfigService) {}

}