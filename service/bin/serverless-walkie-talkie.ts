#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
import { ServerlessWalkieTalkieStack } from '../lib/serverless-walkie-talkie-stack';

const app = new cdk.App();
new ServerlessWalkieTalkieStack(app, 'ServerlessWalkieTalkieStack');
