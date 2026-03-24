<?php

namespace Database\Seeders;

use App\Models\Baby;
use App\Models\BabyAction;
use App\Models\User;
use Carbon\CarbonImmutable;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class BabyActionFebruary2026Seeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        mt_srand(20260201);

        $user = User::firstOrCreate(
            ['mail_address' => 'test@example.com'],
            [
                'name' => 'Test User',
                'password' => Hash::make('password'),
            ]
        );

        $baby = Baby::firstOrCreate(
            ['user_id' => $user->id],
            ['baby_name' => 'ダミーベビー']
        );

        $periodStart = CarbonImmutable::create(2026, 2, 1, 0, 0, 0);
        $periodEnd = CarbonImmutable::create(2026, 2, 28, 23, 59, 59);

        BabyAction::where('baby_id', $baby->id)
            ->whereBetween('start_date', [$periodStart, $periodEnd])
            ->forceDelete();

        $rows = [];
        $day = $periodStart->startOfDay();

        while ($day->lte($periodEnd->startOfDay())) {
            $this->appendSleepActions($rows, $baby->id, $day);
            $this->appendFeedingActions($rows, $baby->id, $day);
            $this->appendMealActions($rows, $baby->id, $day);
            $this->appendExcretionActions($rows, $baby->id, $day);
            $day = $day->addDay();
        }

        BabyAction::insert($rows);
    }

    private function appendSleepActions(array &$rows, int $babyId, CarbonImmutable $day): void
    {
        $nightStart = $day->setTime(21, 0)->addMinutes(mt_rand(-25, 25));
        $nightEnd = $nightStart->addHours(mt_rand(8, 10))->addMinutes(mt_rand(-10, 20));
        $this->addAction(
            $rows,
            $babyId,
            1,
            $nightStart,
            $nightEnd,
            null,
            $this->cryFlag(1, (int) $nightStart->format('H')),
            'dummy-202602: 夜睡眠'
        );

        $napStart = $day->setTime(13, 0)->addMinutes(mt_rand(-30, 30));
        $napEnd = $napStart->addMinutes(mt_rand(60, 120));
        $this->addAction(
            $rows,
            $babyId,
            1,
            $napStart,
            $napEnd,
            null,
            $this->cryFlag(1, (int) $napStart->format('H')),
            'dummy-202602: 昼寝'
        );
    }

    private function appendFeedingActions(array &$rows, int $babyId, CarbonImmutable $day): void
    {
        $hours = [6, 10, 15, 20];
        foreach ($hours as $hour) {
            $start = $day->setTime($hour, 0)->addMinutes(mt_rand(-20, 20));
            $end = $start->addMinutes(mt_rand(15, 40));
            $milkAmount = mt_rand(120, 220);
            $this->addAction(
                $rows,
                $babyId,
                2,
                $start,
                $end,
                $milkAmount,
                $this->cryFlag(2, (int) $start->format('H')),
                'dummy-202602: 授乳'
            );
        }
    }

    private function appendMealActions(array &$rows, int $babyId, CarbonImmutable $day): void
    {
        $hours = [8, 12, 18];
        foreach ($hours as $hour) {
            $start = $day->setTime($hour, 0)->addMinutes(mt_rand(-20, 20));
            $end = $start->addMinutes(mt_rand(20, 45));
            $this->addAction(
                $rows,
                $babyId,
                3,
                $start,
                $end,
                null,
                $this->cryFlag(3, (int) $start->format('H')),
                'dummy-202602: 食事'
            );
        }
    }

    private function appendExcretionActions(array &$rows, int $babyId, CarbonImmutable $day): void
    {
        $peeHours = [7, 9, 13, 17, 22];
        foreach ($peeHours as $hour) {
            $start = $day->setTime($hour, 0)->addMinutes(mt_rand(-25, 25));
            $end = $start->addMinutes(mt_rand(5, 15));
            $this->addAction(
                $rows,
                $babyId,
                5,
                $start,
                $end,
                null,
                $this->cryFlag(5, (int) $start->format('H')),
                'dummy-202602: おしっこ'
            );
        }

        $poopHour = mt_rand(10, 19);
        $poopStart = $day->setTime($poopHour, 0)->addMinutes(mt_rand(-20, 20));
        $poopEnd = $poopStart->addMinutes(mt_rand(8, 20));
        $actionType = mt_rand(1, 100) <= 25 ? 6 : 4;
        $memo = $actionType === 6 ? 'dummy-202602: うんち/おしっこ' : 'dummy-202602: うんち';
        $this->addAction(
            $rows,
            $babyId,
            $actionType,
            $poopStart,
            $poopEnd,
            null,
            $this->cryFlag($actionType, (int) $poopStart->format('H')),
            $memo
        );
    }

    private function addAction(
        array &$rows,
        int $babyId,
        int $action,
        CarbonImmutable $start,
        CarbonImmutable $end,
        ?int $milkAmount,
        bool $cry,
        string $memo
    ): void {
        $rows[] = [
            'baby_id' => $babyId,
            'action' => $action,
            'cry' => $cry,
            'start_date' => $start->format('Y-m-d H:i:s'),
            'end_date' => $end->format('Y-m-d H:i:s'),
            'milk_amount' => $milkAmount,
            'memo' => $memo,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }

    private function cryFlag(int $action, int $hour): bool
    {
        $base = 8;

        if ($action === 2) {
            $base = 18;
        } elseif ($action === 4 || $action === 6) {
            $base = 22;
        }

        if ($hour >= 18 && $hour <= 22) {
            $base += 10;
        }

        return mt_rand(1, 100) <= $base;
    }
}

