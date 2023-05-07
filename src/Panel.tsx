import React from "react";
import {API, useAddonState} from "@storybook/manager-api";
import {AddonPanel} from "@storybook/components";
import {ADDON_ID, EVENTS, PARAM_KEY} from "./constants";
import {StyleResource} from './StyleResource';
import {StyleResourcePanel} from './components/StyleResourcePanel';

interface PanelProps {
  active: boolean;
  key: string;
  api: API;
}

interface DataProps {
    id: string;
    list: StyleResource[];
    currentList: StyleResource[];
}

interface StyleResourceLookup {
  [key: string]: StyleResource;
}

export const StylePanel: (api: API) => React.FC<PanelProps> = (api) => {
  return (props) => {
    // https://storybook.js.org/docs/react/addons/addons-api#useaddonstate
    const [results, setState] = useAddonState(ADDON_ID, {
      currentStoryId: '',
      list: null,
    });

    const getPicked = () => {
        const currentParameters = api.getCurrentParameter<StyleResource[]>(PARAM_KEY);
        return (results.list || currentParameters)?.filter((el: StyleResource) => el.picked);
    }

    const checkDefault = () => {
        const picked = getPicked();

        console.log('checkDefault', {picked});

        if (picked) {
            api.emit(EVENTS.SET, picked);
        }
    }

    if (!props.active) {
        checkDefault();
    }

    const changeData = ({id, list, currentList}: DataProps) => {
      if (list && currentList) {
          const existingIds = currentList.reduce((lookup: StyleResourceLookup, res: StyleResource) => {
              lookup[res.id] = res;
              return lookup;
          }, {} as StyleResourceLookup);

          const mergedList = list.map((res: StyleResource) => {
              const existingItem = existingIds[res.id];

              return existingItem
                  ? {
                      ...res,
                      picked: id === res.id ? !existingItem.picked : existingItem.picked,
                  }
                  : res;
          });

          const picked = mergedList.filter((res: StyleResource) => res.picked);

          setState({ list: mergedList, currentStoryId: id });

          api.emit(EVENTS.SET, picked);
      } else {
          checkDefault();
      }
    }

    if (!props || !props.active) {
        console.log('1', {props});
        return (
            <AddonPanel active={false} children={null} key={props.key} />
        );
    }

    console.log('2', {props});

    return (
        <AddonPanel {...props}>
          <StyleResourcePanel
              results={results}
              api={api}
              changeData={changeData}
          />
        </AddonPanel>
    );
  }
};

