import React, {useEffect} from 'react';
import {styled} from '@storybook/theming';
import {Icons, Placeholder, Spaced, SyntaxHighlighter} from '@storybook/components';
import {StyleResource} from '../StyleResource';
import {API} from '@storybook/manager-api';
import {PARAM_KEY} from '../constants';

interface State {
    currentStoryId: string;
    list: StyleResource[];
}

interface PanelContentProps {
    results: State;
    api: API;
    changeData: (data: any) => void;
}

const maxLimitToUseSyntaxHighlighter = 100000;

const PlainCode = styled.pre({
    textAlign: 'left',
    fontWeight: 'normal',
});

const Warning = styled.div({
    display: 'flex',
    padding: '10px',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#fff3cd',
    fontSize: 12,
    '& svg': {
        marginRight: 10,
        width: 24,
        height: 24,
    },
});

export const StyleResourcePanel: React.FC<PanelContentProps> =
    ({
      results,
      api,
      changeData
    }) => {
        const parameters = api.getCurrentParameter<StyleResource[]>(PARAM_KEY);

        const list = results.list || parameters;

        const onChange = (id: string) => {
            const { list: currentList, currentStoryId } = results;

            changeData({
                id,
                list,
                currentList: currentList || list,
                currentStoryId,
            });
        };

        useEffect(() => {
            // Anything in here is fired on component mount.
            console.log('Anything in here is fired on component mount');
            // setTimeout(() => onChange(''));
            return () => {
                // Anything in here is fired on component unmount.
                console.log('Anything in here is fired on component unmount');
            }
        }, [])

    return (
        <div>
            {list && list.length &&
                list.map(({ id, code, picked, hideCode = false }) => (
                    <div key={id} style={{ padding: 10 }}>
                        <label>
                            <input type="checkbox" checked={picked} onChange={onChange.bind(null, id)} id={id} />
                            <span>#{id}</span>
                        </label>
                        {code && !hideCode && code.length < maxLimitToUseSyntaxHighlighter && (
                            <SyntaxHighlighter language="html">{code}</SyntaxHighlighter>
                        )}
                        {code && !hideCode && code.length >= maxLimitToUseSyntaxHighlighter && (
                            <Placeholder>
                                <Spaced row={1}>
                                    <PlainCode>{code.substring(0, maxLimitToUseSyntaxHighlighter)} ...</PlainCode>
                                    <Warning>
                                        <Icons icon="alert" />
                                        Rest of the content cannot be displayed
                                    </Warning>
                                </Spaced>
                            </Placeholder>
                        )}
                    </div>
                ))}
        </div>
    )
};
