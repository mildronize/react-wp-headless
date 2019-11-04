import ContentLoader from 'react-content-loader'
import React from 'react';

function random(a, b){
    return Math.floor((Math.random() * b) + a);
}

function getParagraph(numLines, numParagraphs){
    const height = 10;
    const lineSpacing = 7;
    const paragraphSpacing = 15;
    const numLinesPerParagraph = parseInt(numLines / numParagraphs);
    const widths = ["25%","50%","75%"];
  
    let listRect = [];
    let y_cursor = 70;
    let lastLineWidth;
    for(let para = 0; para < numParagraphs; para ++){
        for (let i = 0; i < numLinesPerParagraph + 1; i++) {
            listRect.push(
                <rect x="0" y={y_cursor} rx="2" ry="2" width="100%" height={height} />
            );
            y_cursor += height + lineSpacing;
        }
        lastLineWidth = widths[random(0,2)];
        listRect.push(
            <rect x="0" y={y_cursor} rx="2" ry="2" width={lastLineWidth} height={height} />
        );
        y_cursor += height + paragraphSpacing;
    }
    return listRect;
}

export function PageLoader(){
    const paragraph = getParagraph(8, 3);
    return (
      <ContentLoader height={300}>
      {/* Only SVG shapes */}    
      <rect x="0" y="0" rx="2" ry="2" width="70%" height="30" />
      {paragraph}
    </ContentLoader>
    )
  };

export const ArticleLoader = () => (
    // https://github.com/danilowoz/create-content-loader/blob/master/src/Gallery/insertYourLoaderHere/Article.js
    <ContentLoader
      height={400}
      width={400}
    >
      <rect x="0" y="13" rx="4" ry="4" width="400" height="30" />
      <rect x="0" y="49" rx="4" ry="4" width="100" height="20" />
      <rect x="0" y="80" rx="4" ry="4" width="400" height="10" />
      <rect x="0" y="95" rx="4" ry="4" width="400" height="10" />
      <rect x="0" y="109" rx="4" ry="4" width="100" height="10" />
      <rect x="0" y="129" rx="5" ry="5" width="400" height="150" />
      <rect x="0" y="289" rx="4" ry="4" width="400" height="10" />
      <rect x="0" y="305" rx="4" ry="4" width="100" height="10" />
    </ContentLoader>
  )