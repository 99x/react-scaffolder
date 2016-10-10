# react-cli ![Dependency status](https://david-dm.org/99xt/react-cli.svg)

[![Join the chat at https://gitter.im/react-cli-99xt/Lobby](https://badges.gitter.im/react-cli-99xt/Lobby.svg)](https://gitter.im/react-cli-99xt/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[Scaffolding](https://en.wikipedia.org/wiki/Scaffolding) tool for [React](https://facebook.github.io/react/)

react-cli is a command line interface which brings smooth developer experience (DX) for React devs. react-cli provides a better way to generate react projects with [react-boilerplate](https://github.com/99xt/react-boilerplate). With this tool it's possible to continue generating boilerplate code with heavy customizations once a project is initiated.

## Install

```
$ npm install -g @99xt/react-cli
```

## Usage

### react init [name]
*alias: i*

#### name

Project name.

#### Options

* `-l`
Add eslint configuration.

---------------------------------------

### react generate component [module] [component]
*alias: g*

#### module

Module name where the react component should be placed within. (Subdirectory within components directory)

#### component

React component name.

---------------------------------------

### react generate test [module] [component]
*alias: g*

Create React component.

#### module

Module name where the test file should be placed within. (Subdirectory within __tests__ directory)

#### component

Test file name.

---------------------------------------

### react view -c -t
*alias: v*

View react components and test files.

#### Options

* `-c`
View React components file directory.

* `-t`
View tests file directory.

### react config [key] [value]
*alias: c*

Change configuration in .reactclirc.

#### key

Key for configuration
example: client

#### value

Value for configuration
example: src (source directory)

---------------------------------------

## Configuring existing projects

To use react-cli in existing React project navigate to directory where React components are created.
Create react-cli configuration file, `.reactclirc` (similar to `.babelrc`). Add configuration in key value pairs.

```
{
	"client": "src" 
}
```

This specifies that React components are placed in `src/components` directory.

---------------------------------------

## Features

- Initiate React projects
- Create React components
- Create test files
- Interactive view of the component structure

## References

- [What is scaffolding ?](https://en.wikipedia.org/wiki/Scaffold_(programming))
- [What is a CLI ?](https://www.techopedia.com/definition/3337/command-line-interface-cli)
- [Why good UX in CLIs matters](https://trevorsullivan.net/2016/07/11/designing-command-line-tools/)
- Projects with similar objectives
 - [Yeoman](http://yeoman.io/)

## Contributor guidelines

- Fork the repository.
- Clone the forked repository.
- Create your own branch.
- Create tests and make sure tests pass on travis.
- Create a pull request with changes made.

For more information refer [CONTRIBUTING.md](https://github.com/99xt/react-cli/blob/master/CONTRIBUTING.md)

## License

MIT © [99XT](https://github.com/99xt)