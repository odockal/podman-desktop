/**********************************************************************
 * Copyright (C) 2026 Red Hat, Inc.
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

// Filenames produced by Podman5DownloadMachineOS.download() in
// extensions/podman/packages/extension/scripts/podman-download.ts when AIRGAP_DOWNLOAD
// is set at build time -- cross-checked against tests/playwright/scripts/validate-airgap-assets.sh,
// which already hardcodes the same two names.
export const AIRGAP_MACHINE_IMAGE_FILENAMES = ['podman-image-arm64.zst', 'podman-image-x64.zst'];

// rh-podman-desktop's pre-build-script.sh injects this file with a release-date suffix
// that changes over time (e.g. "Red Hat Standard EULA 20251020.pdf"), so match on the
// stable prefix/suffix rather than the exact filename.
export const EULA_FILENAME_PATTERN = /^Red Hat Standard EULA .*\.pdf$/;
