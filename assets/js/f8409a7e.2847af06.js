"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[6903],{4304:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>a,contentTitle:()=>d,default:()=>h,frontMatter:()=>r,metadata:()=>o,toc:()=>c});var s=n(4848),i=n(8453);const r={sidebar_position:1,title:"Getting Started"},d="Get Started",o={id:"intro",title:"Getting Started",description:"React Native Styled System is a React Native implementation",source:"@site/docs/intro.mdx",sourceDirName:".",slug:"/intro",permalink:"/react-native-styled-system/docs/intro",draft:!1,unlisted:!1,editUrl:"https://github.com/mj-studio-library/react-native-styled-system/tree/main/doc/docs/intro.mdx",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1,title:"Getting Started"},sidebar:"tutorialSidebar",next:{title:"Usage",permalink:"/react-native-styled-system/docs/category/usage"}},a={},c=[{value:"Why we need styled-system",id:"why-we-need-styled-system",level:2},{value:"Supported features",id:"supported-features",level:2}];function l(e){const t={admonition:"admonition",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h1,{id:"get-started",children:"Get Started"}),"\n",(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.code,{children:"React Native Styled System"})," is a React Native implementation\nof the ",(0,s.jsx)(t.code,{children:"styled-system"})," package commonly used on the web."]}),"\n",(0,s.jsx)(t.h2,{id:"why-we-need-styled-system",children:"Why we need styled-system"}),"\n",(0,s.jsx)(t.p,{children:"Let me show this code."}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-tsx",children:"const Sample = () => {\n  const theme = useTheme();\n\n  return (\n    <View style={{\n      backgroundColor: theme.colors.red500,\n      borderRadius: theme.radii.lg\n    }}>\n      <Text style={[theme.typography.h1, { marginTop: theme.spaces[4] }]}>\n        React Native\n      </Text>\n    </View>\n  );\n};\n"})}),"\n",(0,s.jsx)(t.p,{children:"This is quite verbose."}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:"With Styled System! \ud83d\udc47"})}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-tsx",children:"const Sample = () => {\n  return (\n    <Box bg={'red500'} radius={'lg'}>\n      <Txt t={'h1'} mt={4}>\n        React Native\n      </Txt>\n    </Box>\n  );\n};\n"})}),"\n",(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.code,{children:"styled-system"})," is useful for rapid UI development by providing a consistent approach to styling in React applications."]}),"\n",(0,s.jsx)(t.p,{children:"It offers a design system with predefined style props that streamline component styling, ensuring scalability, consistency, and responsive design."}),"\n",(0,s.jsxs)(t.p,{children:["But original ",(0,s.jsx)(t.code,{children:"styled-system"})," is for CSS not in React Native."]}),"\n",(0,s.jsxs)(t.p,{children:["We introduce ",(0,s.jsx)(t.strong,{children:"React Native Styled System"})," \ud83c\udf89"]}),"\n",(0,s.jsx)(t.p,{children:"\xa0"}),"\n",(0,s.jsxs)(t.admonition,{type:"info",children:[(0,s.jsxs)(t.p,{children:["It does not fully support the grammar of ",(0,s.jsx)(t.code,{children:"styled-system"})," and there are some grammars that are not currently supported, but this is not a technical limitation and will be added as needed."]}),(0,s.jsxs)(t.p,{children:["Styles such as ",(0,s.jsx)(t.code,{children:"justifySelf"})," that are not yet supported in React Native obviously cannot be added in the future."]})]}),"\n",(0,s.jsx)(t.h2,{id:"supported-features",children:"Supported features"}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsxs)(t.li,{children:["Allows arguments such as ",(0,s.jsx)(t.code,{children:"m, px, py, bg, flex, flexDirection, position"})," to be passed directly to Props according to the grammar of ",(0,s.jsx)(t.code,{children:"styled-system"}),"."]}),"\n",(0,s.jsx)(t.li,{children:"Users can define the design system by directly defining and delivering themes."}),"\n",(0,s.jsx)(t.li,{children:"TypeScript can be fully used through the Type Generation process using CLI."}),"\n",(0,s.jsxs)(t.li,{children:["Logical or responsive values such as ",(0,s.jsx)(t.code,{children:"safeAreaTop"})," and ",(0,s.jsx)(t.code,{children:"sidePadding"})," can be injected into the theme and used as token values."]}),"\n",(0,s.jsx)(t.li,{children:"Text Typography"}),"\n",(0,s.jsx)(t.li,{children:"Integrate Dark Theme easily."}),"\n"]})]})}function h(e={}){const{wrapper:t}={...(0,i.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(l,{...e})}):l(e)}},8453:(e,t,n)=>{n.d(t,{R:()=>d,x:()=>o});var s=n(6540);const i={},r=s.createContext(i);function d(e){const t=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:d(e.components),s.createElement(r.Provider,{value:t},e.children)}}}]);