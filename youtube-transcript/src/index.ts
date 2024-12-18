import app from "./app/app";

function main() {
  try {
    app.listen(process.env.PORT || 3000, () => {
      console.log("Server is running on port 3000");
    });
  } catch (err: any) {
    console.error(err);
    process.exit(1);
  }
}

main();
