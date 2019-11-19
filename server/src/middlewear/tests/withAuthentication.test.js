import withAuthenticated from "../withAuthentication";

test("It calls next()", () => {
  const next = jest.fn(x => x);
  withAuthenticated({}, {}, next);
  expect(next.mock.calls.length).toBe(1);
});

test("It adds isAuthenticated and isAdmin flages to req", () => {
  const next = jest.fn(x => x);
  const req = {};
  withAuthenticated(req, {}, next);
  expect(typeof req.isAuthenticated === "boolean").toBe(true);
  expect(typeof req.isAdmin === "boolean").toBe(true);
});
