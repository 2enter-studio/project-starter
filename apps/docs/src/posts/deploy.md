---
title: 🌴 Deployment
description: 樣板
date: '2024-10-10'
published: true
---

## Section Heading

Content

```sveltehtml title="/path_to/file.svelte"
<script lang="ts">
  import { sleep } from '@repo/lib/utils/runtime';
  await sleep();
</script>

<div class="full-screen">{sleep}</div>
```

### Subsection heading

Something

## Import & use svelte component

<script>
    import { ThemeSwitcher } from '@repo/ui';
</script>

<ThemeSwitcher />
