from marshmallow import Schema, fields, validate, ValidationError

class UserRegistrationSchema(Schema):
    name = fields.Str(required=True, validate=validate.Length(min=2, max=100))
    email = fields.Email(required=True)
    phone = fields.Str(required=True, validate=validate.Length(min=10, max=15))
    password = fields.Str(required=True, validate=validate.Length(min=6))
    role = fields.Str(required=True, validate=validate.OneOf(['user', 'companion']))

class UserLoginSchema(Schema):
    email = fields.Email(required=True)
    password = fields.Str(required=True)

class CompanionProfileSchema(Schema):
    description = fields.Str(allow_none=True)
    age = fields.Int(allow_none=True, validate=validate.Range(min=18, max=100))
    gender = fields.Str(allow_none=True, validate=validate.OneOf(['male', 'female', 'other']))
    location = fields.Str(allow_none=True, validate=validate.Length(max=100))
    profile_image = fields.Str(allow_none=True)

class CompanionServiceSchema(Schema):
    service_name = fields.Str(required=True, validate=validate.Length(min=2, max=100))
    description = fields.Str(allow_none=True)
    price_per_hour = fields.Decimal(required=True, validate=validate.Range(min=0))
    price_per_day = fields.Decimal(allow_none=True, validate=validate.Range(min=0))
    is_available = fields.Bool(default=True)

class BookingSchema(Schema):
    companion_profile_id = fields.Int(required=True)
    service_id = fields.Int(required=True)
    start_time = fields.DateTime(required=True)
    end_time = fields.DateTime(required=True)
    notes = fields.Str(allow_none=True)

class BookingUpdateSchema(Schema):
    status = fields.Str(validate=validate.OneOf(['pending', 'confirmed', 'completed', 'cancelled']))
    payment_status = fields.Str(validate=validate.OneOf(['pending', 'paid', 'refunded']))
    payment_method = fields.Str(allow_none=True)
    notes = fields.Str(allow_none=True) 