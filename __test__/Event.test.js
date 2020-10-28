const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app.js");
const { User, Event, RepEvent, UserEvent, UserRepEvent } = require("../models");

chai.use(chaiHttp);
const expect = chai.expect;
var Cookies;
describe("Event Controller Test", () => {
  describe("POST /event/one", () => {
    afterEach(async () => {
      await Event.destroy({ where: { name: "Event123" } });
    });
    it("일회성 이벤트를 생성해야 한다", (done) => {
      chai
        .request(app)
        .post("/user/login")
        .send({ email: "test", password: "1234" })
        .then(({ header }) => {
          Cookies = header["set-cookie"].pop().split(";")[0];
          chai
            .request(app)
            .post("/event/one")
            .set("cookie", Cookies)
            .send({
              name: "Event123",
              start_time: toString(new Date().getTime()),
              end_time: toString(new Date().getTime() + 3 * 60 * 60 * 1000),
              description: "EventTest",
            })
            .end((err, res) => {
              Event.findOne({
                where: {
                  name: "Event123",
                },
              }).then((event) => {
                expect(event).to.not.equal(null);
                expect(res).to.have.status(201);
                expect(res.body.message).to.equal("일회성 이벤트 생성 성공");
                done();
              });
            });
        });
    });
    it("이벤트 생성시 자동으로 참여해야 한다", (done) => {
      chai
        .request(app)
        .post("/event/one")
        .set("cookie", Cookies)
        .send({
          name: "Event123",
          start_time: toString(new Date().getTime()),
          end_time: toString(new Date().getTime() + 3 * 60 * 60 * 1000),
          description: "EventTest",
        })
        .end((err, res) => {
          Event.findOne({
            where: {
              name: "Event123",
            },
          }).then(({ owner }) => {
            expect(owner).to.equal("1");
            done();
          });
        });
    });
  });
  describe("POST /event/repeat", () => {
    afterEach(async () => {
      await RepEvent.destroy({ where: { name: "Event1234" } });
    });
    it("반복성 이벤트를 생성해야 한다", (done) => {
      chai
        .request(app)
        .post("/event/repeat")
        .set("cookie", Cookies)
        .send({
          name: "Event1234",
          kind: "test",
          start_time: toString(new Date().getTime()),
          end_time: toString(new Date().getTime() + 3 * 60 * 60 * 1000),
          start_date: "",
          end_date: "",
          repetition: "135",
          description: "repEventTest",
        })
        .end((err, res) => {
          RepEvent.findOne({
            where: {
              name: "Event1234",
            },
          }).then((event) => {
            expect(event).to.not.equal(null);
            expect(res).to.have.status(201);
            expect(res.body.message).to.equal("반복성 이벤트 생성 성공");
            done();
          });
        });
    });
    it("이벤트 생성시 자동으로 참여해야 한다", (done) => {
      chai
        .request(app)
        .post("/event/repeat")
        .set("cookie", Cookies)
        .send({
          name: "Event1234",
          kind: "test",
          start_time: toString(new Date().getTime()),
          end_time: toString(new Date().getTime() + 3 * 60 * 60 * 1000),
          start_date: "",
          end_date: "",
          repetition: "135",
          description: "repEventTest",
        })
        .end((err, res) => {
          RepEvent.findOne({
            where: {
              name: "Event1234",
            },
          }).then(({ owner }) => {
            expect(owner).to.equal("1");
            done();
          });
        });
    });
  });
  describe("GET /event", () => {
    it("10월 1일 ~ 10월 30일의 이벤트를 조회해야 한다", (done) => {
      chai
        .request(app)
        .get("/event?start=1601556193617&end=1604061796075")
        .end((err, res) => {
          //expect(res).to.have.status(200);
          //expect(res.body).to.be.an("array");
          //expect(res.body[0]).has.all.keys(["event", "participants"]);
          done();
        });
    });
  });
  describe("DELETE /event", () => {
    beforeEach(async () => {
      await RepEvent.create({
        name: "Event123456",
        identifier: "testID",
        kind: "TEST",
        start_time: "",
        end_time: "",
        start_date: "1602075226778",
        end_date: "1603284829183",
        repetition: "",
        description: "EventTest",
        owner: "1",
      });
    });
    it("로그인한 회원이 이벤트를 삭제할 수 있다", (done) => {
      chai
        .request(app)
        .delete("/event")
        .set("cookie", Cookies)
        .send({
          identifier: "testID",
        })
        .end((err, res) => {
          RepEvent.findOne({ where: { name: "Event123456" } }).then(
            (repEvent) => {
              expect(repEvent).to.equal(null);
              expect(res).to.have.status(200);
              expect(res.body.message).to.equal("반복성 이벤트 삭제 성공");
              done();
            }
          );
        });
    });
  });
  describe("PUT /event", () => {
    beforeEach(async () => {
      await RepEvent.create({
        name: "Event12345678",
        identifier: "testID~",
        kind: "TEST",
        start_time: "",
        end_time: "",
        start_date: "1602075226778",
        end_date: "1603284829183",
        repetition: "",
        description: "EventTest",
        owner: "2",
      });
    });
    afterEach(async () => {
      await RepEvent.destroy({ where: { name: "Event12345678" } });
    });
    it("로그인한 회원은 이벤트 참여 여부를 수정할 수 있다", (done) => {
      chai
        .request(app)
        .put("/event")
        .set("cookie", Cookies)
        .send({
          identifier: "testID~",
          isRepeat: true,
        })
        .end((err, res) => {
          RepEvent.findOne({ where: { identifier: "testID~" } }).then(
            (repEvent) => {
              UserRepEvent.findOne({
                where: { user_id: 1, rep_event_id: repEvent.id },
              }).then((userReqEvent) => {
                expect(res).to.have.status(200);
                expect(userReqEvent).to.not.equal(null);
                done();
              });
            }
          );
        });
    });
  });
});
