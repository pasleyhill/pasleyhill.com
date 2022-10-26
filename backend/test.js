require("dotenv").config();
process.env.dev = true;
console.log(process.env);
const { handler } = require("./main");

handler({
  body: JSON.stringify({
    first_name: "Test",
    last_name: "Test",
    requestContext: {
        identity: {
            sourceIp: '71.185.20.92'
        }
    },
    response:
      "03AIIukzgySf0Dm3chGai6Ca4qAE4vxNhBqYSckwE6Al1h4bG2Zv83gvJWzMzDV0XzE3uhbtGT58HPKTHenGtlLP_TALdjpuq3MEoSfda9oBE0K51ALl32H6DaKpABrTJ3y_Kapa6eWc25QLot_lSR7_BvDdB1siG7I9pEmZu62XaftQyq3EYlyzzGypnGXqVZY_8KnXDLBCQ1jwOA2AZ9G4F7fCsdaZQFF8ZiwXQFi4Qv6WGWdMqNS6Iow4YyKz4_w3UD1AgwOI7jk6Szs5JGuyxbgn8a0IvOKySEsh3oQMnO8TldJjQxUm4NwAPGQSEQea2Ytlp_4suxHUL5scOJiaIIYypSnjgGECajcvaaEtEPORXxrfqpbwUwgvYJjg4Mg5BogIeAw2BU0ssHs5JpQte7xGgnD5uCDhVqGzPHFUrOYq40zXDG7u6CWTq85IwEoUGKT-eEEi7kuVc2F2XxBNGhZ3jR_MM16FwLi_U7QO0CTOwKtxaDD6I",
  }),
})
  .then((e) => console.log(e))
  .catch((error) => console.error({ error }));
