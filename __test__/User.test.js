const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app.js");
const { User } = require("../models");

chai.use(chaiHttp);
const expect = chai.expect;

describe("User Controller Test", () => {
  describe("POST /user/register", () => {
    afterEach(async () => {
      await User.destroy({ where: { email: "test1234" } });
    });
    it("회원가입 시 성공 메세지를 응답한다", (done) => {
      chai
        .request(app)
        .post("/user/register")
        .send({
          name: "김코딩",
          email: "test1234",
          password: "1234",
        })
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          User.findOne({ where: { email: "test1234" } }).then((user) => {
            expect(user).to.not.equal(null);
            expect(res).to.have.status(201);
            expect(res.body.message).to.equal("회원가입 성공");
            done();
          });
        });
    });

    it("회원가입 시 DB에 password가 암호화된 상태로 저장된다", (done) => {
      chai
        .request(app)
        .post("/user/register")
        .send({
          name: "김코딩",
          email: "test1234",
          password: "1234",
        })
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          User.findOne({
            where: {
              email: "test1234",
            },
          }).then((res) => {
            expect(res).to.not.equal(null);
            expect(res).to.not.equal("1234");
            done();
          });
        });
    });
  });
  describe("POST /user/login", () => {
    it("로그인 성공 시 JWT 쿠키를 발급해야한다", (done) => {
      chai
        .request(app)
        .post("/user/login")
        .send({ email: "test", password: "1234" })
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          const Cookies = res.header["set-cookie"].pop().split(";")[0];
          expect(Cookies).to.not.equal(undefined);
          expect(res).to.have.status(201);
          expect(res.body.message).to.equal("로그인 성공");
          done();
        });
    });
  });
});
