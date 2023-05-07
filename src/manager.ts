import {addons, types} from "@storybook/manager-api";
import {ADDON_ID, PANEL_ID, PARAM_KEY, PARAM_TITLE, TAB_ID, TOOL_ID} from "./constants";
import {Tool} from "./Tool";
import {StylePanel} from "./Panel";
import {Tab} from "./Tab";

/**
 * Note: if you want to use JSX in this file, rename it to `manager.tsx`
 * and update the entry prop in tsup.config.ts to use "src/manager.tsx",
 */

// Register the addon
addons.register(ADDON_ID, (api) => {
  // Register the tool
  addons.add(TOOL_ID, {
    type: types.TOOL,
    title: PARAM_TITLE,
    match: ({ viewMode }) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
    render: Tool,
  });

  // Register the panel
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: PARAM_TITLE,
    match: ({ viewMode }) => viewMode === "story",
    render: StylePanel(api),
    paramKey: PARAM_KEY,
  });

  // Register the tab
  addons.add(TAB_ID, {
    type: types.TAB,
    title: PARAM_TITLE,
    //👇 Checks the current route for the story
    route: ({ storyId }) => `/${PARAM_KEY}/${storyId}`,
    //👇 Shows the Tab UI element in myaddon view mode
    match: ({ viewMode }) => viewMode === `${PARAM_KEY}`,
    render: Tab,
  });
});
