
AWS.config(
  :access_key_id => 'AKIAIVWTTSSQEUIGTDZA',
  :secret_access_key => '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'
)

S3_BUCKET =  AWS::S3.new.buckets['lemusic']