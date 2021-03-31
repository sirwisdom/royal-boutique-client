import React from "react";
import { Helmet } from "react-helmet";
function MetaDecorator({ decorator }) {
  return (
    <div className="application">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{decorator.title}</title>
        <meta name="title" content={decorator.title} />
        <meta name="description" content={decorator.description} />
        <meta name="keywords" content={decorator.keywords} />
      </Helmet>
    </div>
  );
}

export default MetaDecorator;
