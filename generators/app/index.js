/* eslint-disable */
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path');
const fs = require('fs-extra');
const boxen = require('boxen');

const BOXEN_OPTS = {
  padding: 1,
  margin: 1,
  align: 'center',
  borderColor: 'yellow',
  borderStyle: 'round'
};

const GITHUB_BASE = 'https://github.com/Inventsable/';

class CEPVueCLIGenerator extends Generator {
  async prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(`Welcome to the ${chalk.blue('cep-vue-cli')} generator!`));

    this.answers = await this.prompt([
      {
        type: 'input',
        name: 'extName',
        message: 'Name of panel?',
        default: 'My Vue-CLI-3 Panel'
      },
      {
        type: 'list',
        name: 'templateType',
        message: 'Which template should be used?',
        choices: [
          {
            name: 'Basic',
            value: ''
          },
          {
            name: 'Router',
            value: ''
          },
          {
            name: 'Plus (Vuetify, Router, Lottie)',
            value: ''
          }
        ]
      },
      {
        type: 'checkbox',
        name: 'hostList',
        message: 'Host apps to include:',
        choices: [
          {
            name: 'Illustrator',
            value: 'ILST'
          },
          {
            name: 'After Effects',
            value: 'AEFT'
          },
          {
            name: 'Photoshop',
            value: 'PHXS'
          },
          {
            name: 'Premiere Pro',
            value: 'PPRO'
          },
          {
            name: 'InDesign',
            value: 'IDSN'
          },
          {
            name: 'Audition',
            value: 'AUDT'
          }
        ]
      },
      {
        type: 'confirm',
        name: 'hasPrav',
        message: 'Add Typescript support for .jsx files?',
        default: 'y'
      }
    ]);

    // return this.prompt(prompts).then(props => {
    //   // To access props later use this.props.someAnswer;
    //   this.props = props;
    // });
  }

  writing() {
    // this.log('Name:', this.answers.extName.split(' ').join('-'));
    // this.log('Template:', this.answers.templateType);
    // this.log('Hosts:', this.answers.hostList);
  }

  install() {
    this.installDependencies({
      bower: false
    });
  }

  end() {
    const info = `${chalk.blue(
      `${this.answers.extName.split(' ').join('-')}`
    )} is ready in Window > Extensions.\r\nUse ${chalk.yellow(
      'npm run serve'
    )} to begin coding`;
    this.log(
      boxen(info, {
        ...BOXEN_OPTS,
        ...{
          borderColor: 'white'
        }
      })
    );
  }
}

module.exports = CEPVueCLIGenerator;
