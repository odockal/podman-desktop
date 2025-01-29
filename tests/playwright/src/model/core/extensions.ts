/**********************************************************************
 * Copyright (C) 2025 Red Hat, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ***********************************************************************/

// Extension locators definition
export interface ExtensionType {
  extensionName: string;
  extensionFullName: string;
  extensionLabel: string;
}

// Catalog/External extensions
export const minikubeExtension: ExtensionType = {
  extensionName: 'minikube',
  extensionFullName: 'minikube extension',
  extensionLabel: 'podman-desktop.minikube',
};

export const podmanAILabExtension: ExtensionType = {
  extensionName: 'Podman AI Lab',
  extensionFullName: 'Podman AI Lab extension',
  extensionLabel: 'redhat.ai-lab',
};

export const extensionsPackExtension: ExtensionType = {
  extensionName: 'Red Hat Extension Pack',
  extensionFullName: 'Red Hat Extension Pack extension',
  extensionLabel: 'redhat.redhat-pack',
};

export const bootcExtension: ExtensionType = {
  extensionName: 'Bootable Container',
  extensionFullName: 'Bootable Container extension',
  extensionLabel: 'redhat.bootc',
};

export const developerSandboxExtension: ExtensionType = {
  extensionName: 'Developer Sandbox',
  extensionFullName: 'Developer Sandbox extension',
  extensionLabel: 'redhat.redhat-sandbox',
};

export const imageLayersExplorerExtension: ExtensionType = {
  extensionName: 'Image Layers Explorer',
  extensionFullName: 'Image Layers Explorer extension',
  extensionLabel: 'podman-desktop.layers-explorer',
};

export const podmanQuadletExtension: ExtensionType = {
  extensionName: 'Podman Quadlet',
  extensionFullName: 'Podman Quadlet extension',
  extensionLabel: 'podman-desktop.quadlet',
};

export const ssoExtension: ExtensionType = {
  extensionName: 'Red Hat Authentication',
  extensionFullName: 'Red Hat Authentication extension',
  extensionLabel: 'redhat.redhat-authentication',
};

export const openshiftCheckerExtension: ExtensionType = {
  extensionName: 'Red Hat OpenShift Checker',
  extensionFullName: 'Red Hat OpenShift Checker extension',
  extensionLabel: 'redhat.openshift-checker',
};

export const openshiftLocalExtension: ExtensionType = {
  extensionName: 'Red Hat OpenShift Local',
  extensionFullName: 'Red Hat OpenShift Local extension',
  extensionLabel: 'redhat.openshift-local',
};

// external contributor
export const headlampExtension: ExtensionType = {
  extensionName: 'minikube',
  extensionFullName: 'minikube extension',
  extensionLabel: 'podman-desktop.minikube',
};

// Built-in extensions
export const composeExtension: ExtensionType = {
  extensionName: 'Compose',
  extensionFullName: 'Compose extension',
  extensionLabel: 'podman-desktop.compose',
};

export const dockerExtension: ExtensionType = {
  extensionName: 'Docker',
  extensionFullName: 'Docker extension',
  extensionLabel: 'podman-desktop.docker',
};

export const kindExtension: ExtensionType = {
  extensionName: 'Kind',
  extensionFullName: 'Kind extension',
  extensionLabel: 'podman-desktop.kind',
};

export const kubeContextExtension: ExtensionType = {
  extensionName: 'Kube Context',
  extensionFullName: 'Kube Context extension',
  extensionLabel: 'podman-desktop.kube-context',
};

export const kubectlCLIExtension: ExtensionType = {
  extensionName: 'kubectl CLI',
  extensionFullName: 'kubectl CLI extension',
  extensionLabel: 'podman-desktop.kubectl-cli',
};

export const LimaExtension: ExtensionType = {
  extensionName: 'Lima',
  extensionFullName: 'Lima extension',
  extensionLabel: 'podman-desktop.lima',
};

export const podmanExtension: ExtensionType = {
  extensionName: 'Podman',
  extensionFullName: 'Podman extension',
  extensionLabel: 'podman-desktop.podman',
};

export const registriesExtension: ExtensionType = {
  extensionName: 'Registries',
  extensionFullName: 'Registries extension',
  extensionLabel: 'podman-desktop.registries',
};

export const extensionsBuiltInList = [
  composeExtension,
  dockerExtension,
  kindExtension,
  kubeContextExtension,
  kubectlCLIExtension,
  podmanAILabExtension,
  registriesExtension,
];
export const extensionsExternalList = [
  minikubeExtension,
  podmanAILabExtension,
  extensionsPackExtension,
  bootcExtension,
  developerSandboxExtension,
  imageLayersExplorerExtension,
  podmanQuadletExtension,
  ssoExtension,
  openshiftCheckerExtension,
  openshiftLocalExtension,
];
export const extensionsAllExternalList = [...extensionsExternalList, headlampExtension];
