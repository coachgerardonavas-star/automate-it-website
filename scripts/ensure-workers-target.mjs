if (process.env.CF_PAGES === "1") {
  throw new Error(
    "Este build usa @astrojs/cloudflare 14 y requiere Workers. " +
    "Se cancela en Pages para conservar el despliegue anterior."
  );
}
