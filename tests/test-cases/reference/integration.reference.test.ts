import {MockWriteStreams} from "../../../src/mock-write-streams";
import {handler} from "../../../src/handler";
import chalk from "chalk";
import {initSpawnSpy} from "../../mocks/utils.mock";
import {WhenStatics} from "../../mocks/when-statics";

beforeAll(() => {
    initSpawnSpy(WhenStatics.all);
});

test("reference <test-job>", async () => {
    const writeStreams = new MockWriteStreams();
    await handler({
        cwd: "tests/test-cases/reference",
        job: ["test-job"],
    }, writeStreams);


    const expected = [
        chalk`{blueBright test-job} {greenBright >} Ancient`,
        chalk`{blueBright test-job} {greenBright >} Base`,
        chalk`{blueBright test-job} {greenBright >} Setting something general up`,
        chalk`{blueBright test-job} {greenBright >} Yoyo`,
    ];
    expect(writeStreams.stdoutLines).toEqual(expect.arrayContaining(expected));
});
