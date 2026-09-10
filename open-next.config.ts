import { defineCloudflareConfig } from "@opennextjs/cloudflare";

/**
 * No incremental-cache override on purpose.
 *
 * Every page here is statically rendered at build time and carries no
 * revalidate window, so there is nothing for an ISR cache to hold. Adding the
 * R2 cache would mean provisioning a bucket to store nothing. If a
 * revalidating route is ever added, swap in `r2IncrementalCache` here and
 * declare the bucket in wrangler.jsonc.
 */
export default defineCloudflareConfig();
