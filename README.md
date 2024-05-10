# Generative AI Workshop

Welcome to our Generative AI workshop! This repository contains all the necessary materials and instructions to get you started. Follow the steps below to set up your environment fully.

## Prerequisites

Before you begin, ensure you have the following:

- Node.js installed on your system. If you don't have Node.js installed, download it from [the official Node.js website](https://nodejs.org/).
- Install the [Google Cloud CLI](https://cloud.google.com/sdk/docs/install)
- Access to a Google Cloud Platform (GCP) account.

## Setup Instructions

Follow these steps to prepare your environment for the workshop.

### Step 1: Google Cloud Platform (GCP) Project

1. **Choose or Create a Cloud Platform Project:** If you haven't already, sign in to your Google Cloud account and select or create a new project from the [Google Cloud Console](https://console.cloud.google.com/).

2. **Activate Billing:** Ensure that billing is activated for your selected project. This is necessary to use Google Cloud resources. More information can be found [here](https://cloud.google.com/billing/docs/how-to/modify-project).

### Step 2: Enable APIs

Enable the Vertex AI API for your project by visiting the [APIs & Services Dashboard](https://console.cloud.google.com/flows/enableapi?apiid=aiplatform.googleapis.com) in the Google Cloud Console and searching for the Vertex AI API. Follow the prompts to enable it.


### Step 3: Setup Authentication

To enable API access from your local environment, set up authentication using a service account:

1. In the Google Cloud Console, go to the **Service Accounts** page.
2. Select your project and click **Create Service Account**.
3. Follow the instructions to create the service account. After creation, download the JSON key file for the account.
4. Set the environment variable `GOOGLE_APPLICATION_CREDENTIALS` to the path of the JSON key file. This allows your application to authenticate with Google Cloud APIs.

### Step 4: Install Dependencies

Install the necessary libraries for this workshop by running the following command in your terminal or command prompt:

```bash
npm install
```
This command installs all the dependencies defined in the `package.json` file and may take a few minutes to complete.

## Getting Started

After installing the dependencies, you're ready to proceed with the workshop content 🎉

```bash
npm run start
```
and follow the prompts!

Happy coding! 🚀💜
