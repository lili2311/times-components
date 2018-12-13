/* eslint-disable react/prop-types */
import React from "react";
import articleAdConfig from "@times-components/ad/fixtures/article-ad-config.json";
import Context, { defaults } from "@times-components/context";
import { ArticleProvider } from "@times-components/provider";
import {
  article as makeParams,
  MockFixture,
  MockedProvider
} from "@times-components/provider-test-tools";
import { sections } from "@times-components/storybook";
import { scales, themeFactory } from "@times-components/styleguide";
import storybookReporter from "@times-components/tealium-utils";
import ArticleMagazineStandard from "./src/article-magazine-standard";

const makeArticleUrl = ({ slug, shortIdentifier }) =>
  slug && shortIdentifier
    ? `https://www.thetimes.co.uk/article/${slug}-${shortIdentifier}`
    : "";

const preventDefaultedAction = decorateAction =>
  decorateAction([
    ([e, ...args]) => {
      e.preventDefault();
      return ["[SyntheticEvent (storybook prevented default)]", ...args];
    }
  ]);

const templateName = "magazinestandard";

const renderArticle = ({
  adConfig = articleAdConfig,
  analyticsStream,
  decorateAction,
  id,
  scale,
  section
}) => (
  <ArticleProvider debounceTimeMs={0} id={id}>
    {({ article, isLoading, error, refetch }) => {
      const data = {
        ...article,
        template: "magazinestandard"
      };

      return (
        <Context.Provider
          value={{
            makeArticleUrl,
            theme: {
              ...themeFactory(section, templateName),
              scale: scale || defaults.theme.scale
            }
          }}
        >
          <ArticleMagazineStandard
            adConfig={adConfig}
            analyticsStream={analyticsStream}
            article={data}
            error={error}
            isLoading={isLoading}
            onAuthorPress={preventDefaultedAction(decorateAction)(
              "onAuthorPress"
            )}
            onCommentGuidelinesPress={preventDefaultedAction(decorateAction)(
              "onCommentGuidelinesPress"
            )}
            onCommentsPress={preventDefaultedAction(decorateAction)(
              "onCommentsPress"
            )}
            onLinkPress={preventDefaultedAction(decorateAction)("onLinkPress")}
            onRelatedArticlePress={preventDefaultedAction(decorateAction)(
              "onRelatedArticlePress"
            )}
            onTopicPress={preventDefaultedAction(decorateAction)(
              "onTopicPress"
            )}
            onTwitterLinkPress={preventDefaultedAction(decorateAction)(
              "onTwitterLinkPress"
            )}
            onVideoPress={preventDefaultedAction(decorateAction)(
              "onVideoPress"
            )}
            refetch={refetch}
          />
        </Context.Provider>
      );
    }}
  </ArticleProvider>
);

const mockArticle = ({
  adConfig = articleAdConfig,
  analyticsStream = storybookReporter,
  decorateAction,
  id,
  params,
  scale,
  section
}) => (
  <MockFixture
    params={params}
    render={mocks => (
      <MockedProvider mocks={mocks}>
        {renderArticle({
          adConfig,
          analyticsStream,
          decorateAction,
          id,
          scale,
          section
        })}
      </MockedProvider>
    )}
  />
);

const selectScales = select => select("Scale", scales, scales.medium);
const selectSection = select =>
  sections[select("Section", sections, "The Sunday Times Magazine")];

export default {
  children: [
    {
      component: ({ select }, { decorateAction }) => {
        const id = "198c4b2f-ecec-4f34-be53-c89f83bc1b44";
        const scale = selectScales(select);
        const section = selectSection(select);

        return mockArticle({
          decorateAction,
          id,
          params: makeParams({
            error: () => new Error("Article error"),
            variables: () => ({
              id
            })
          }),
          scale,
          section
        });
      },
      name: "Magazine Standard - Error",
      platform: "native",
      type: "story"
    }
  ],
  name: "Pages/Templates"
};
