# cf-nav



GitHub Repository for [https://github.com/Open-souce-scripts/cf-nav](https://github.com/Open-souce-scripts/cf-nav)

ask question and cloudflare : [https://t.me/seagoing123](https://t.me/seagoing123)

[![Repository](https://img.shields.io/badge/View%20on-GitHub-blue.svg)](https://github.com/Open-souce-scripts/cf-nav)



## Deploy in pages.dev



1. Clone this repository deploy in cloudflare pages.

2. Add `nodejs_compat` at setting Compatibility flags



## Deploy in worker.dev

1. Copy `_worker.js` code from [here](https://github.com/Open-souce-scripts/cf-nav/blob/main/src/_work.js).

2. Alternatively, you can click the button below to deploy directly.

   [![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/Open-souce-scripts/cf-nav)


## Auto Deploy in worker.dev



## 1. Authentication



When running Wrangler locally, authentication to the Cloudflare API happens via the [`wrangler login`](https://developers.cloudflare.com/workers/wrangler/commands/#login) command, which initiates an interactive authentication flow. Since CI/CD environments are non-interactive, Wrangler requires a [Cloudflare API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) and [account ID](https://developers.cloudflare.com/fundamentals/setup/find-account-and-zone-ids/) to authenticate with the Cloudflare API.

### Cloudflare account ID



To find your Cloudflare account ID, refer to [Find account and zone IDs](https://developers.cloudflare.com/fundamentals/setup/find-account-and-zone-ids/).

### API token



To create an API token to authenticate Wrangler in your CI job:

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/).
2. Select **My Profile** > **API Tokens**.
3. Select **Create Token** > find **Edit Cloudflare Workers** > select **Use Template**.
4. Customize your token name.
5. Scope your token.

You will need to choose the account and zone resources that the generated API token will have access to. We recommend scoping these down as much as possible to limit the access of your token. For example, if you have access to three different Cloudflare accounts, you should restrict the generated API token to only the account on which you will be deploying a Worker.

.
