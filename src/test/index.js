import http from "http";
import assert from "assert";

describe("Example Node Server", () => {
  it("should return 200", done => {
    http.get("http://localhost:8055", res => {
      assert.strictequal(200, res.statusCode);
      done();
    });
  });
});
