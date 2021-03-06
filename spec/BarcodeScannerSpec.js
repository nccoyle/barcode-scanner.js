// Generated by CoffeeScript 1.3.3

/*

  expectBarcodeScan = (submit, expectedSerializedValue, inputTargetName, expectedInputValue, barcode, hitEnter = true)
*/


(function() {

  describe("Barcode Scanner", function() {
    var _this = this;
    $(document).on("submit", "form", function(e) {
      return e.preventDefault();
    });
    it("is defined", function() {
      return expect(window.BarcodeScanner).toBeDefined();
    });
    it("puts a barcode scanner input to the last barcode-scanner-target", function() {
      $("body").append(multipleBarcodeTargets.clone());
      return expectBarcodeScan(true, "first=&second=SPAPE", "second", "SPAPE", "SPAPE");
    });
    it("puts a barcode scanner input to a focused element first", function() {
      $("body").append(multipleBarcodeTargets.clone());
      $("form:last input[name='first']").focus();
      expectBarcodeScan(true, "first=SPAPE&second=", "first", "SPAPE", "SPAPE");
      return $("form:last input[name='first']").blur();
    });
    it("prevents submit when the specific data attribute is set on the form", function() {
      $("body").append(formWithPreventSubmit.clone());
      return expectBarcodeScan(false, null, "second", "SPAPE", "SPAPE");
    });
    it("prevents submit when the specific data attribute is set on the input", function() {
      $("body").append(inputWithPreventSubmit.clone());
      return expectBarcodeScan(false, null, "second", "SPAPE", "SPAPE");
    });
    it("performs a simple registered action", function() {
      var functionCalls;
      functionCalls = [];
      $("body").append(multipleBarcodeTargets.clone());
      BarcodeScanner.addAction("c (id)", function(id) {
        return functionCalls.push(id);
      });
      expectBarcodeScan(false, null, null, null, "c 512");
      return expect(functionCalls).toMatch(['512']);
    });
    return it("performs a more complex registered action", function() {
      var functionCalls;
      functionCalls = [];
      $("body").append(multipleBarcodeTargets.clone());
      BarcodeScanner.addAction("c (id) (user) (name)", function(id, user, name) {
        return functionCalls.push({
          id: id,
          user: user,
          name: name
        });
      });
      expectBarcodeScan(false, null, null, null, "c 512 SPAPE Sebastian");
      return expect(functionCalls).toMatch({
        id: '512',
        user: 'SPAPE',
        name: 'Sebastian'
      });
    });
  });

}).call(this);
