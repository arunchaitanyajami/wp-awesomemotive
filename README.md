# WP AwesomeMotive Plugin
Plugin that retrieves data from a remote API, and makes an admin-only accessible ReatJs app with three tabs: one that displays a graph, one that displays a table  and one that has a settings form.

## Development

In order to start your development environment you will need to install the following tools on your host machine:

- Git

- Docker

- Docker Compose

You will also need to add a hosts entry to the host machine as follows if you which you use separate domain for local instance:

`127.0.0.1 awesomemotive.local`

Then you can run:

`./local`

This will start a local Docker development environment including any necessary dependencies such as the MySQL database and web server. Once complete, you should be able to access the local environment via `http://awesomemotive.local` in your web browser.

Several dev dependencies are managed via Composer. After running the `./local` command you should complete the WP steps.

You can also run Composer commands directly from your host machine but you may not be using the same version of PHP as is used in the project so you may need to ignore platform dependencies.

### Troubleshooting

If you run into any difficulties bringing up the local development environment you can run `./local reset`. This will rebuild the Docker images as well as deleting all volumes and running containers. This may be required if the Docker configuration has been changed.
