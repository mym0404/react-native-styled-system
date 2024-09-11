Thanks for showing interest to contribute to React Native Styled System 💖, you rock!

When it comes to open source, there are different ways you can contribute, all
of which are valuable. Here's a few guidelines that should help you as you
prepare your contribution.

## Setup the Project

The following steps will get you up and running to contribute to this repository:

1. Fork the repo (click the <kbd>Fork</kbd> button at the top right of
   [this page](https://github.com/mym0404/react-native-styled-system))

2. Clone your fork locally

3. Setup all the dependencies and packages by running `yarn && yarn example`. This
   command will install dependencies and example project dependencies.

4. Run `yarn check:all` anytime to ensure format, typing, test aren't broken.

## Development

### Commands

**`yarn install`**: bootstraps the entire project, symlinks all dependencies.

**`yarn check:lint`**: Check ESLint

**`yarn check:type`**: Check typescript without noEmit

**`yarn check:test`**: Run test with jest

## Think you found a bug?

Please conform to the issue template and provide a clear path to reproduction
with a code example. The best way to show a bug is by sending a CodeSandbox
link.

## Proposing new or changed API?

Please provide thoughtful comments and some sample API code. Proposals that
don't line up with our roadmap or don't have a thoughtful explanation will be
closed.

## Making a Pull Request?

Pull requests need only the :+1: of two or more collaborators to be merged; when
the PR author is a collaborator, that counts as one.

### Commit Convention

Before you create a Pull Request, please check whether your commits comply with
the commit conventions used in this repository.

Rules through commitlint are applied, and correct commit messages can be created with git cz through commitizen.

- [commitlint](https://commitlint.js.org/)
- [commitizen cz-cli](https://github.com/commitizen/cz-cli)

When you create a commit we kindly ask you to follow the convention
`category(scope or module, optional): message` in your commit message while using one of
the following categories:

- `feat / feature`: all changes that introduce completely new code or new
  features
- `fix`: changes that fix a bug (ideally you will additionally reference an
  issue if present)
- `refactor`: any code related change that is not a fix nor a feature
- `docs`: changing existing or creating new documentation (i.e. README, docs for
  usage of a lib or cli usage)
- `build`: all changes regarding the build of the software, changes to
  dependencies or the addition of new dependencies
- `test`: all changes regarding tests (adding new tests or changing existing
  ones)
- `ci`: all changes regarding the configuration of continuous integration (i.e.
  github actions, ci system)
- `chore`: all changes to the repository that do not fit into any of the above
  categories

If you are interested in the detailed specification you can visit
<https://www.conventionalcommits.org/> or check out the
[Angular Commit Message Guidelines](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines).

### Steps to PR

1. Fork of the this repository and clone your fork

2. Create a new branch out of the `main` or `develop` branch. We follow the convention
   `[type/scope]`. For example `fix/accordion-hook` or `docs/menu-typo`. `type`
   can be either `docs`, `fix`, `feat`, `build`, or any other conventional
   commit type. `scope` is just a short id that describes the scope of work.

3. Make and commit your changes following the
   [commit convention](https://github.com/mym0404/react-native-styled-system/blob/main/CONTRIBUTING.md#commit-convention).
   As you develop, you can run `yarn check:all` and to make sure everything works as expected.

4. You should base branch of PR as `develop`.

### Example Project

While developing, you can run the example app to test your changes.
Any changes you make in your library's JavaScript code will be reflected in the example app without a rebuild.
If you change any native code, then you'll need to rebuild the example app.

To start the packager:

```
yarn example start
```

To run the example app on Android:

```
yarn example android
```

To run the example app on iOS:

```
yarn example ios
```

> [!NOTE]
> Currently, the example project doesn't support type for themed tokens. If you feel it is a serious proble, please PR for it!

<details>
<summary>Issue on running example project?</summary>

> In yarn example ios,

- Command failed: osascript -e tell app “System Events” to count processes whose name is “Simulator”
- resolved with turning on System settings > Privacy & Security > Automation > WebStorm(or terminal?) - System Events

> In yarn example android

- Watchman error: std::__1::system_error: open: {PROJECT_PATH}: Operation not permitted
- resolved with watchman watch-del-all && watchman shutdown-server in cmd

</details>

### Tests

All commits that fix bugs or add features need a test.

## Want to write a blog post or tutorial

That would be amazing! Reach out to me (<mym0404@gmail.com>).

We would love to support you any way we can.

## Want to help improve the docs?

Our docsite lives in a `doc` directory in project. If you're
interested in contributing to the documentation, create pr as manual.

> [!TIP]
> The documentation website will be deployed if main branch pushed(released).

## License

By contributing your code to the react-native-styled-system GitHub repository, you agree to
license your contribution under the MIT license.
