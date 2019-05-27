// Thanks https://github.com/blockfe/generator-blockfe-cli

const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const path = require("path");
const fse = require("fs-extra");
const fs = require("fs");
const download = require("download-git-repo");
const shell = require("shelljs");

// Box-style message for end
const boxen = require("boxen");
const BOXEN_OPTS = {
  padding: 1,
  margin: 1,
  align: "center",
  borderColor: "yellow",
  borderStyle: "round"
};

// Spinner component for terminal
const ora = require("ora");
const ORA_SPINNER = {
  interval: 80,
  frames: [
    "   ⠋",
    "   ⠙",
    "   ⠚",
    "   ⠞",
    "   ⠖",
    "   ⠦",
    "   ⠴",
    "   ⠲",
    "   ⠳",
    "   ⠓"
  ]
};

const CEP_HOSTLIST = [
  {
    name: "ILST",
    version: "[23,99.9]"
  },
  {
    name: "AEFT",
    version: "[16,99.9]"
  },
  {
    name: "PHXS",
    version: "[20,99.9]"
  },
  {
    name: "IDSN",
    version: "[14,99.9]"
  },
  {
    name: "PPRO",
    version: "[23,99.9]"
  },
  {
    name: "AUDT",
    version: "[12,99.9]"
  }
];

// For future use:
//  const CEP_HOSTLIST_ALT = [
//   {
//     name: "AICY",
//     version: "[14,99.9]"
//   },
//   {
//     name: "PRLD",
//     version: "[8,99.9]"
//   },
//   {
//     name: "FLPR",
//     version: "[19,99.9]"
//   },
//   {
//     name: "DRWV",
//     version: "[19,99.9]"
//   },
//   {
//     name: "KBGR",
//     version: "[9,99.9]"
//   },
//   {
//     name: "RUSH",
//     version: "[1,99.9]"
//   }
// ];

// Validation rules for prompts
const requireValidPort = value => {
  return /\d{4,5}/.test(value) && value > 1023 && value < 65535
    ? true
    : "Must be a valid Port between 1024 and 65534";
};
const requireOneValue = value => {
  return value.length > 1 ? true : "Must select at least one";
};

// https://yeoman.io/authoring/user-interactions.html
class CEPVueCLIGenerator extends Generator {
  async prompting() {
    // Have Yeoman greet the user
    this.log(yosay(`Welcome to the ${chalk.blue("cep-vue-cli")} generator!`));

    // Sequence of message prompts
    // https://github.com/SBoudrias/Inquirer.js#prompt-types
    this.answers = await this.prompt([
      {
        type: "input",
        name: "extName",
        message: "Name of panel?",
        default: "My Vue-CLI-3 Panel"
      },
      {
        type: "list",
        name: "templateType",
        message: "Which template should be used?",
        choices: [
          {
            name: "Bare (Absolute minimum)",
            value: "cep-vue-cli-bare"
          },
          {
            name: "Basic (Include utility components)",
            value: "cep-vue-cli-basic"
          },
          {
            name: "Router (Basic and Vue Router)",
            value: "cep-vue-cli-router"
          },
          {
            name: "Plus (Vuetify, Router, Lottie)",
            value: "cep-vue-cli-plus"
          }
        ],
        validate: requireOneValue
      },
      {
        type: "checkbox",
        name: "hostList",
        message: "Host apps to include:",
        choices: [
          {
            name: "Illustrator",
            value: "ILST"
          },
          {
            name: "After Effects",
            value: "AEFT"
          },
          {
            name: "Photoshop",
            value: "PHXS"
          },
          {
            name: "Premiere Pro",
            value: "PPRO"
          },
          {
            name: "InDesign",
            value: "IDSN"
          },
          {
            name: "Audition",
            value: "AUDT"
          }
        ],
        validate: requireOneValue
      },
      {
        type: "number",
        name: "portNum",
        message: "Base CEF Port (between 1024 and 65534)",
        default: 8888,
        validate: requireValidPort
      }
    ]);
  }

  writing() {
    const DIR_NAME = this.answers.extName.split(" ").join("-");
    const GITHUB_LINK = `Inventsable/${this.answers.templateType}`;
    let spinner = ora({
      text: `Downloading template from ${GITHUB_LINK}...`,
      spinner: ORA_SPINNER
    }).start();

    this._downloadTemplate()
      .then(() => {
        spinner.stopAndPersist({
          symbol: chalk.green("   ✔"),
          text: `Download complete.`
        });
        const TEMPLATE_ROOT = this.destinationPath(DIR_NAME, ".tmp");
        this._walk(TEMPLATE_ROOT, TEMPLATE_ROOT);

        fse.removeSync(TEMPLATE_ROOT);
        this._correctPlaceholders().then(() => {
          spinner = ora({
            text: `Running ${chalk.yellow("npm install")} for you...`,
            spinner: ORA_SPINNER
          }).start();
          shell.cd(DIR_NAME);
          shell.exec("npm install", () => {
            spinner.stopAndPersist({
              symbol: chalk.green("   ✔"),
              text: `Installation complete.`
            });
            const info = `${chalk.blue(
              `${this.answers.extName.split(" ").join("-")}`
            )} is ready!`;
            this.log(
              boxen(info, {
                ...BOXEN_OPTS,
                ...{
                  borderColor: "white"
                }
              })
            );
            this.log();
            this.log(`   Ready to get started? Run the following commands:`);
            this.log();
            this.log(`      ${chalk.yellow(`cd ${DIR_NAME}`)}`);
            this.log(`      ${chalk.yellow("npm run serve")}`);
            this.log();
            this.log(
              `   Then launch your desired host app and find in Window > Extensions`
            );
            this.log();
          });
        });
      })
      .catch(err => this.env.error(err));
  }

  _downloadTemplate() {
    return new Promise((resolve, reject) => {
      const dirPath = this.destinationPath(
        this.answers.extName.split(" ").join("-"),
        ".tmp"
      );
      download(`Inventsable/${this.answers.templateType}`, dirPath, err =>
        err ? reject(err) : resolve()
      );
    });
  }

  _walk(filePath, templateRoot) {
    const DIR_NAME = this.answers.extName.split(" ").join("-");
    if (fs.statSync(filePath).isDirectory()) {
      fs.readdirSync(filePath).forEach(name => {
        this._walk(path.resolve(filePath, name), templateRoot);
      });
      return;
    }

    const relativePath = path.relative(templateRoot, filePath);
    const destination = this.destinationPath(DIR_NAME, relativePath);
    this.fs.copyTpl(filePath, destination, {
      dirName: DIR_NAME
    });
  }

  _constructDebugText() {
    return new Promise(resolve => {
      let mirror = [];
      this.answers.hostList.forEach((item, i) => {
        const host = CEP_HOSTLIST.find(part => {
          return part.name === item;
        });
        let str = `\r\n    <Host Name="${host.name}" Port="${this.answers
          .portNum + i}" />`;
        mirror.push(str);
      });
      resolve(mirror.join(""));
    });
  }

  _constructManifestText() {
    return new Promise(resolve => {
      let mirror = [];
      this.answers.hostList.forEach(item => {
        const host = CEP_HOSTLIST.find(part => {
          return part.name === item;
        });
        let str = `\r\n      <Host Name="${host.name}" Version="${
          host.version
        }" />`;
        mirror.push(str);
      });
      resolve(mirror.join(""));
    });
  }

  async _correctPlaceholders() {
    const DIR_NAME = this.answers.extName.split(" ").join("-");
    const MANIFEST_TEXT = await this._constructManifestText();
    const DEBUG_TEXT = await this._constructDebugText();
    return new Promise(resolve => {
      this.log("   Correcting placeholders...");
      setTimeout(() => {
        let MANIFEST_FILE = fs.readFileSync(
          `./${DIR_NAME}/CSXS/manifest.xml`,
          "utf8"
        );
        MANIFEST_FILE = MANIFEST_FILE.replace("hostlisthere", MANIFEST_TEXT);
        MANIFEST_FILE = MANIFEST_FILE.split("namehere").join(
          DIR_NAME.toLowerCase()
        );
        MANIFEST_FILE = MANIFEST_FILE.replace(
          "titlehere",
          this.answers.extName
        );
        fs.unlinkSync(`./${DIR_NAME}/CSXS/manifest.xml`);
        fs.writeFileSync(`./${DIR_NAME}/CSXS/manifest.xml`, MANIFEST_FILE);

        let DEBUG_FILE = fs.readFileSync(`./${DIR_NAME}/.debug`, "utf8");
        DEBUG_FILE = DEBUG_FILE.split("namehere").join(DIR_NAME.toLowerCase());
        DEBUG_FILE = DEBUG_FILE.replace("porthere", DEBUG_TEXT);
        fs.unlinkSync(`./${DIR_NAME}/.debug`);
        fs.writeFileSync(`./${DIR_NAME}/.debug`, DEBUG_FILE);

        let INDEX_DEV_FILE = fs.readFileSync(
          `./${DIR_NAME}/public/index-dev.html`,
          "utf8"
        );
        INDEX_DEV_FILE = INDEX_DEV_FILE.split("namehere").join(
          this.answers.extName
        );
        fs.unlinkSync(`./${DIR_NAME}/public/index-dev.html`);
        fs.writeFileSync(`./${DIR_NAME}/public/index-dev.html`, INDEX_DEV_FILE);

        let INDEX_FILE = fs.readFileSync(
          `./${DIR_NAME}/public/index.html`,
          "utf8"
        );
        INDEX_FILE = INDEX_FILE.split("namehere").join(this.answers.extName);
        fs.unlinkSync(`./${DIR_NAME}/public/index.html`);
        fs.writeFileSync(`./${DIR_NAME}/public/index.html`, INDEX_FILE);

        let PACKAGE_FILE = fs.readFileSync(
          `./${DIR_NAME}/package.json`,
          "utf8"
        );
        PACKAGE_FILE = PACKAGE_FILE.split(`${this.answers.templateType}`).join(
          DIR_NAME
        );

        fs.unlinkSync(`./${DIR_NAME}/package.json`);
        fs.writeFileSync(`./${DIR_NAME}/package.json`, PACKAGE_FILE);

        let PACKAGE_LOCK_FILE = fs.readFileSync(
          `./${DIR_NAME}/package-lock.json`,
          "utf8"
        );
        PACKAGE_LOCK_FILE = PACKAGE_LOCK_FILE.split(/"name":\s"[^"]*"/).join(
          `"name": "${DIR_NAME}"`
        );
        fs.unlinkSync(`./${DIR_NAME}/package-lock.json`);
        fs.writeFileSync(`./${DIR_NAME}/package-lock.json`, PACKAGE_LOCK_FILE);

        const OMITTED_APPS = CEP_HOSTLIST.filter(entry => {
          return !this.answers.hostList.some(host => host === entry.name);
        });

        if (!/bare/.test(this.answers.templateType))
          OMITTED_APPS.forEach(hostapp => {
            try {
              fse.removeSync(`./${DIR_NAME}/src/host/${hostapp.name}`);
            } catch (err) {
              this.log(err);
            }
          });

        this.log(`${chalk.green("   ✔")} Creation complete.`);
        this.log(`${chalk.green("   ✔")} Corrections complete.`);
        resolve();
      }, 1000);
    });
  }

  // Not even using Yeoman
  install() {}

  end() {}
}

module.exports = CEPVueCLIGenerator;
