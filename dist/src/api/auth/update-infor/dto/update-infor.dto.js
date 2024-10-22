"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateInforDto = void 0;
const class_validator_1 = require("class-validator");
var Gender;
(function (Gender) {
    Gender["MALE"] = "male";
    Gender["FEMALE"] = "female";
})(Gender || (Gender = {}));
var Status;
(function (Status) {
    Status[Status["BANNED"] = 1] = "BANNED";
    Status[Status["ACTIVE"] = 0] = "ACTIVE";
})(Status || (Status = {}));
class UpdateInforDto {
}
exports.UpdateInforDto = UpdateInforDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateInforDto.prototype, "fullname", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsUrl)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateInforDto.prototype, "url_avatar", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(10, 12),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateInforDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(Gender, {
        message: "Role must be one of the following: admin, user, guest",
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateInforDto.prototype, "gender", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateInforDto.prototype, "age", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], UpdateInforDto.prototype, "birthday", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateInforDto.prototype, "country", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(Gender, {
        message: "User banned status must be one of the following: 0 (active) and 1 (banned)",
    }),
    __metadata("design:type", Number)
], UpdateInforDto.prototype, "is_banned", void 0);
//# sourceMappingURL=update-infor.dto.js.map