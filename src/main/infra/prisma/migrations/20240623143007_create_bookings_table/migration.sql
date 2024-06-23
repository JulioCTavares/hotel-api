BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[bookings] (
    [id] NVARCHAR(1000) NOT NULL,
    [room_number] INT NOT NULL,
    [booking_amount] FLOAT(53) NOT NULL,
    [booking_date] DATETIME2 NOT NULL CONSTRAINT [bookings_booking_date_df] DEFAULT CURRENT_TIMESTAMP,
    [start_date] DATETIME2 NOT NULL,
    [end_date] DATETIME2 NOT NULL,
    [status] NVARCHAR(1000) NOT NULL,
    [user_id] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [bookings_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [bookings_user_id_idx] ON [dbo].[bookings]([user_id]);

-- AddForeignKey
ALTER TABLE [dbo].[bookings] ADD CONSTRAINT [bookings_user_id_fkey] FOREIGN KEY ([user_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
