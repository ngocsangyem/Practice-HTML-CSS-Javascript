import { TestBed } from "@angular/core/testing";

import { CourcesService } from "./cources.service";

describe("CourcesService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: CourcesService = TestBed.get(CourcesService);
    expect(service).toBeTruthy();
  });
});
