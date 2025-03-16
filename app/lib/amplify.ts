'use client';

import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";

// Initialize Amplify configuration
Amplify.configure(outputs);

// Export configured Amplify for use in components
export { Amplify }; 