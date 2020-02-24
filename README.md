# next-exress-session

## 概要

Nest.jsでexpress-sessionを使うだけのサンプルです  

- ローカルで実験可能なように、sessionのstoreにはsession-file-storeを使用しています  
そのためsession情報は./sessionディレクトリに作成されます  

- store関連のコンポーネントはnodeのランタイムを使用するので、Web向けビルドを行うときにWebpackでエラーを起こします  
以下のように、エラーが出たパッケージを取り除くようにしてください

**next.config.js**

```next.config.js
module.exports = {
  webpack: config => ({
    ...config,
    node: {
      child_process: 'empty',
      fs: 'empty',
    }
  })
};
```

## 解説サイト

細かい内容は以下のサイトを参照してください  
[Next.js入門](https://ttis.croud.jp/?uuid=d647e641-61d6-468a-82d7-66fc63df1687)
